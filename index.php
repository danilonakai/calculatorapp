<?php
	if(isset($_GET['url'])){
		$file = array_filter(explode("/", $_GET['url']))[0];
		
		if(!is_dir($file)){
				header('Location: https://github.com/danilonakai');
		}
	}else{
		header('Location: https://github.com/danilonakai');
	}
?>