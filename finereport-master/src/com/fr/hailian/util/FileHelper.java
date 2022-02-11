package com.fr.hailian.util;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import javax.imageio.ImageIO;

public class FileHelper {

    @SuppressWarnings("rawtypes")
    public static void unZip(String srcFile, String dest) throws Exception {
        File file = new File(srcFile);
        if (!file.exists()) {
            throw new Exception("解压文件不存在!");
        }
        ZipFile zipFile = new ZipFile(file);
        Enumeration e = zipFile.entries();
        while (e.hasMoreElements()) {
            ZipEntry zipEntry = (ZipEntry) e.nextElement();
            if (zipEntry.isDirectory()) {
                String name = zipEntry.getName();
                name = name.substring(0, name.length() - 1);
                File f = new File(dest + name);
                f.mkdirs();
            } else {
                File f = new File(dest + zipEntry.getName());
                f.getParentFile().mkdirs();
                f.createNewFile();
                InputStream is = zipFile.getInputStream(zipEntry);
                FileOutputStream fos = new FileOutputStream(f);
                int length = 0;
                byte[] b = new byte[1024];
                while ((length = is.read(b, 0, 1024)) != -1) {
                    fos.write(b, 0, length);
                }
                is.close();
                fos.close();
            }
        }
        if (zipFile != null) {
            zipFile.close();
        }
    }

    // public static void savePicture(String picPath, String savePath)
    // throws Exception {
    // InputStream input = null;
    // FileOutputStream output = null;
    // File f = new File(picPath);
    // input = new FileInputStream(f);
    // if (f.exists()) {
    // input = new FileInputStream(f);
    //
    // } else {
    // System.out.print("文件不存在!");
    // }
    // output = new FileOutputStream(savePath);
    // IOUtils.copy(input, output);
    // output.flush();
    // }

    public static void targetZoomOut(String sourcePath, String savePath) {
        File file1 = new File(sourcePath);
        String name = file1.getName();

        try {
            Image src = javax.imageio.ImageIO.read(file1);
            int w0 = src.getWidth(null);
            int h0 = src.getHeight(null);
            BufferedImage input = ImageIO.read(file1);
            BufferedImage inputbig = new BufferedImage(w0 / 3, h0 / 3,
                    BufferedImage.TYPE_INT_BGR);
            inputbig.getGraphics().drawImage(input, 0, 0, w0 / 3, h0 / 3, null);
            File file2 = new File(savePath); // 此目录保存缩小后的关键图
            if (file2.exists()) {
                System.out.println("该目录已经存在,不需要创建！");
            } else {
                file2.mkdirs();
            }
            ImageIO.write(inputbig, "jpg", new File(savePath + name));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    // 删除某个文件夹下的所有内容
    public static void delFile(String strPath) {
        File file = new File(strPath);
        if (file.exists() && file.isDirectory()) {
            if (file.listFiles().length == 0) {
                file.delete();
            } else {
                File[] ff = file.listFiles();
                for (int i = 0; i < ff.length; i++) {
                    if (ff[i].isDirectory()) {
                        delFile(strPath);
                    }
                    ff[i].delete();
                }
            }
        }
    }

    public static void main(String[] args) throws Exception {
        // unZip("F:\\Test\\ad\\jar\\test.zip","F:\\Test\\ad\\jar\\");
        // savePicture("F:\\Test\\ad\\jar\\test\\yhd.png","F:\\Test\\ad\\picture\\test.jpg");
        // targetZoomOut("F:\\Test\\ad\\jar\\test\\yhd.png");
    }
}