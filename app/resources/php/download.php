<?php


// Config variables
$path = $_SERVER["DOCUMENT_ROOT"]; // base path
$uploads = '/watermark/dist/php/files/'; // udloads dir
$max_size = 2500000; // max size of upload file in bits

if (!file_exists('files')) {
		mkdir('files',777);
}

$files = $_FILES;
$valid_extension = array('.jpg', '.jpeg', '.png', '.gif');
$data = array();

foreach( $files as $file ):
	$type = strtolower(strrchr($file['name'], '.'));
	$filename = md5(uniqid(rand(10000,9999)));
	$file_dist = $path.$uploads.$filename.$type;
	$imageinfo = getimagesize($file['tmp_name']);
	$imageslug = array_keys($files, $file);
	if ($imageinfo['mime'] != 'image/gif' and $imageinfo['mime'] != 'image/jpeg' and $imageinfo['mime'] != 'image/png') { 
		exit('Не верный mime тип!'); 
	} elseif (!in_array($type, $valid_extension)) {  
	    exit('Неверное расширение файла');
	} elseif ($file['size'] > $max_size){ 
	    exit('Файл слишком большой');
	} elseif (!move_uploaded_file($file['tmp_name'], $file_dist)) {
		exit('Не получилось загрузить файл');
	} else {
		$data[$imageslug[0]] = array(
			'filename' => $filename.$type,
			'file_dist' => $file_dist,
			'imageinfo' => $imageinfo,
			'imageslug' => $imageslug[0]
		);
	}
endforeach;
if ($data) {
	include('libs/SimpleImage.php');
	$sizes = $_POST['imgs_sizes'];
	$sizes_dec = json_decode($sizes, true);
	$big_img_w = $sizes_dec['big-img_client_width'];
	$wtm_w = $sizes_dec['watermark_client_width'];
	$x_pos = $_POST['x-position'];
	$y_pos = $_POST['y-position'];
	$opacity = $_POST['watermark-opacity'];
	$bigimage = new libs\SimpleImage('files/'.$data['big_img']['filename']);
	$bigimage->fit_to_width($big_img_w);
	$watermark = new libs\SimpleImage('files/'.$data['water_mark']['filename']);
	$watermark->fit_to_width($wtm_w);
	$bigimage->overlay($watermark, 'top left', $opacity, $x_pos, $y_pos)->save('result.jpg');
	$data = __DIR__.'\result.jpg';
}

echo json_encode($data);
exit(0);