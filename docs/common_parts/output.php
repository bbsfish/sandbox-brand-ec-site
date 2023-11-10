<?php
$edit_files = array("index.html", "about.html", "works.html");
$these_files_root = "C:/Users/YSK_o/Documents/localgitdev/hp2_rpsitry";
$footer_file = "footer_com.html";
// $header_file = "header_com.html";

// Footer
$start_marker = "%#FOOTER%";
$end_marker = "%#FOOTER_END%";

foreach($edit_files as $htmlfile) {
  $onRange = false;
  $bk_file_name = "logs/before_".$htmlfile.".txt";
  $file = $these_files_root."/".$htmlfile;
  echo "# Edit on ".$file."\n";
  echo "- making bk files \n";
  // make before txt
  $fp = fopen($file, 'r+');
  while (!feof($fp))
  {
    $txt = fgets($fp);
    if (strpos($txt, $start_marker) !== false) {
      $onRange = true;
      if (file_exists($bk_file_name)) { unlink($bk_file_name); }
      continue;
    }
    if (strpos($txt, $end_marker) !== false) { $onRange = false; break; }
    if ($onRange) {
      file_put_contents($bk_file_name, $txt, FILE_APPEND);
    }
  }
  fclose($fp);

  echo "- editing html\n";
  $onIgnore = false;
  $html_lines = file($file);
  $com_html_lines = file($footer_file);
  for ($i=0; $i < count($html_lines); $i++) {
    if (strpos($html_lines[$i], $end_marker) !== false) { $onIgnore = false; }
    if ($onIgnore) { continue; }
    file_put_contents($file.".tmp", $html_lines[$i], FILE_APPEND);
    if (strpos($html_lines[$i], $start_marker) !== false) {
      $onIgnore = true;
      file_put_contents($file.".tmp", file_get_contents($footer_file)."\n", FILE_APPEND);
      continue;
    }
  }
  echo "- renaming\n";
  unlink($file);
  rename($file.".tmp", $file);
}
echo "finish";