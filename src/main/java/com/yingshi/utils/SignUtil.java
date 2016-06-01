package com.yingshi.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

/**
 * 请求校验工具类
 */
public class SignUtil {
    /**
     * 验证签名
     *
     * @param signature
     * @param timestamp
     * @param nonce
     * @return
     */
    public static boolean checkSignature(String myToken, String signature, String timestamp, String nonce) {
        String[] arr = new String[]{myToken, timestamp, nonce};
        // 将token、timestamp、nonce三个参数进行字典序排序
        Arrays.sort(arr);
        StringBuilder content = new StringBuilder();
        for (int i = 0; i < arr.length; i++) {
            content.append(arr[i]);
        }
        MessageDigest md;
        String tmpStr = null;

        try {
            md = MessageDigest.getInstance("SHA-1");
            // 将三个参数字符串拼接成一个字符串进行sha1加密
            byte[] digest = md.digest(content.toString().getBytes());
            tmpStr = byteToStr(digest);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        // 将sha1加密后的字符串可与signature对比，标识该请求来源于易信
        return tmpStr != null ? tmpStr.equals(signature.toUpperCase()) : false;
    }
//    public static boolean checkSignature(String myToken, String signature, String timestamp, String nonce) {
//        String[] arr = new String[]{myToken, timestamp, nonce};
//        //按字典排序
//        Arrays.sort(arr);
//        StringBuilder content = new StringBuilder();
//        for (int i = 0; i < arr.length; i++) {
//            content.append(arr[i]);
//        }
//        //加密并返回验证结果
//        return signature == null ? false : signature.equals(encrypt(content.toString(), "SHA-1"));
//    }

    /**
     * @param str     需要加密的字符串
     * @param encName 加密种类  MD5 SHA-1 SHA-256
     * @return
     * @Description: 实现对字符串的加密
     */
    public static String encrypt(String str, String encName) {
        String reStr = null;
        try {
            MessageDigest md5 = MessageDigest.getInstance(encName);
            byte[] bytes = md5.digest(str.getBytes());
            StringBuffer stringBuffer = new StringBuffer();
            for (byte b : bytes) {
                int bt = b & 0xff;
                if (bt < 16) {
                    stringBuffer.append(0);
                }
                stringBuffer.append(Integer.toHexString(bt));
            }
            reStr = stringBuffer.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return reStr;
    }

    /**
     * 将字节数组转换为十六进制字符串
     *
     * @param byteArray
     * @return
     */
    private static String byteToStr(byte[] byteArray) {
        String strDigest = "";
        for (int i = 0; i < byteArray.length; i++) {
            strDigest += byteToHexStr(byteArray[i]);
        }
        return strDigest;
    }

    /**
     * 将字节转换为十六进制字符串
     *
     * @param mByte
     * @return
     */
    private static String byteToHexStr(byte mByte) {
        char[] Digit = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};
        char[] tempArr = new char[2];
        tempArr[0] = Digit[(mByte >>> 4) & 0X0F];
        tempArr[1] = Digit[mByte & 0X0F];

        String s = new String(tempArr);
        return s;
    }
}

