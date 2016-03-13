<?php


// Config variables
$path = $_SERVER["DOCUMENT_ROOT"]; // base path
$uploads = '/php/files/'; // udloads dir (if lockal add this /watermark/dist) 
$max_size = 2500000; // max size of upload file in bits

if (!file_exists('files')) {
		mkdir('files',0777);
}

if (file_exists('./files')) {
	foreach (glob('./files/*') as $file):
		unlink($file);
	endforeach;
}

$files = $_FILES;
$valid_extension = array('.jpg', '.jpeg', '.png', '.gif');
// $data = array();

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
	$big_img_h = $sizes_dec['big-img_client_height'];
	$wtm_h = $sizes_dec['watermark_client_height'];
	$wtm_w = $sizes_dec['watermark_client_width'];
	$x_pos = $_POST['x-position'];
	$y_pos = $_POST['y-position'];
	$opacity = $_POST['watermark-opacity'];
	$bigimage = new libs\SimpleImage('files/'.$data['big_img']['filename']);
	$bigimage->fit_to_width($big_img_w);
	$watermark = new libs\SimpleImage('files/'.$data['water_mark']['filename']);
	$watermark->fit_to_width($wtm_w);


	$mode = $sizes_dec['mode'];

	if ($mode == 'single') {
		$bigimage->overlay($watermark, 'top left', $opacity, $x_pos, $y_pos)->save('result.jpg');
		$data = __DIR__.'\result.jpg';
	}

	if ($mode == 'tiling') {

		$indent_x = $_POST['x-position'];
		$indent_y = $_POST['y-position'];
		$x_pos = $sizes_dec['offset-x']+$indent_x;
		$y_pos = $sizes_dec['offset-y']+$indent_y;
		$x_count = ceil( $sizes_dec['canvas-width'] / $wtm_w );
		$y_count = ceil( $sizes_dec['canvas-height'] / $wtm_h );
		$total_count = $x_count * $y_count;
		$space_x = $wtm_w+$indent_x;
		$space_y = $wtm_h+$indent_y;
		$offset_x = 0;
		$offset_y = 0;
		$count = 0;
		while ($count <= $total_count) {
			$bigimage->overlay($watermark, 'top left', $opacity, $x_pos, $y_pos);
			$x_pos = $x_pos+$space_x;
			$count++;
			$offset_x++;
			if ($offset_x == $x_count) {
				$y_pos = $y_pos+$space_y;
				$x_pos = $sizes_dec['offset-x']+$indent_x;
				$offset_x = 0;
			}
		}
		$bigimage->save('result.jpg');
		$data = __DIR__.'\result.jpg';
	}
}

echo json_encode($_POST);
exit(0);