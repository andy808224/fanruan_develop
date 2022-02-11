package com.fr.hailian.util;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Vector;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.io.IOUtils;


public class StringHelper {

    public static String getResultByReg(String content, String reg) {
        List<String> list = new ArrayList<String>();
        Pattern pa = Pattern.compile(reg, Pattern.DOTALL);
        Matcher ma1 = pa.matcher(content);
        if (ma1.find()) {
            list.add(ma1.group(1));
            return list.get(0);
        } else {
            return null;
        }
    }


    // 解析数字为文字
    public static String convertNumToString(String s) {
        String result = "";
        String[] aa = s.replace("&nbsp;", "").split(";");
        for (int i = 0; i < aa.length; i++) {
            if (aa[i].indexOf("&#") >= 0) {
                String[] bb = aa[i].split("&#");
                for (int j = 0; j < bb.length; j++) {
                    if (bb[j].matches("[0-9]+")
                            && aa[i].indexOf("&#" + bb[j]) >= 0
                            && aa[i].indexOf(bb[j] + "&#" + bb[j]) < 0) {
                        result = result
                                + ((char) Integer.valueOf(
                                        bb[j].replace(";", "")).intValue());
                    } else {
                        result = result + bb[j];
                    }
                }
            } else {
                result = result + aa[i];
            }
        }
        return result;
    }


    // 根据内容返回加密ID
    public static String encryptByString(String content) {
        return Password.createPassword(content);
    }

    // 将String保存到指定的路径
    public static boolean stringToFile(String content, String savePath,
            String fileName) {
        InputStream input = null;
        FileOutputStream output = null;
        File path = new File(savePath);
        File finallyPath = new File(savePath + "//" + fileName);
        if (!path.getAbsoluteFile().exists()) {
            path.getAbsoluteFile().mkdirs();
        } else {
            FileHelper.delFile(savePath);
        }
        try {
            input = new ByteArrayInputStream(content.getBytes());
            output = new FileOutputStream(finallyPath.getAbsolutePath());
            IOUtils.copy(input, output);
            output.flush();
            return true;
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        } finally {
            IOUtils.closeQuietly(output);
            IOUtils.closeQuietly(input);
        }
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    public static String[][] convertResult(ResultSet res) {
        String[][] result = null;
        int column = 0;
        Vector vector = new Vector();
        try {
            while (res.next()) {
                column = res.getMetaData().getColumnCount();
                String[] str = new String[column];
                for (int i = 1; i < column + 1; i++) {
                    Object ob = res.getObject(i);
                    if (ob == null)
                        str[i - 1] = "";
                    else
                        str[i - 1] = ob.toString();
                }
                vector.addElement(str.clone());
            }
            result = new String[vector.size()][column];
            vector.copyInto(result);
            vector.clear();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }

    public static void main(String[] args) {
        stringToFile("jiamali", "F://eee", "123.jpg");
    }

}
