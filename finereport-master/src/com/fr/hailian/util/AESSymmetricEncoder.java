package com.fr.hailian.util;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Map;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import com.fr.hailian.core.Constants;
import com.fr.stable.StringUtils;
/**
 * 
 * @className SymmetricEncoder.java
 * @time   2017年8月9日 下午5:35:42
 * @author zuoqb
 * @todo   AES签名工具类
 */
public class AESSymmetricEncoder {
	/*
	 * 加密 1.构造密钥生成器 2.根据ecnodeRules规则初始化密钥生成器 3.产生密钥 4.创建和初始化密码器 5.内容加密 6.返回字符串
	 */
	public static String AESEncode(String encodeRules, String content) {
		try {
			// 1.构造密钥生成器，指定为AES算法,不区分大小写
			KeyGenerator keygen = KeyGenerator.getInstance("AES");
			// 2.根据ecnodeRules规则初始化密钥生成器
			// 生成一个128位的随机源,根据传入的字节数组
			keygen.init(128, new SecureRandom(encodeRules.getBytes()));
			// 3.产生原始对称密钥
			SecretKey original_key = keygen.generateKey();
			// 4.获得原始对称密钥的字节数组
			byte[] raw = original_key.getEncoded();
			// 5.根据字节数组生成AES密钥
			SecretKey key = new SecretKeySpec(raw, "AES");
			// 6.根据指定算法AES自成密码器
			Cipher cipher = Cipher.getInstance("AES");
			// 7.初始化密码器，第一个参数为加密(Encrypt_mode)或者解密解密(Decrypt_mode)操作，第二个参数为使用的KEY
			cipher.init(Cipher.ENCRYPT_MODE, key);
			// 8.获取加密内容的字节数组(这里要设置为utf-8)不然内容中如果有中文和英文混合中文就会解密为乱码
			byte[] byte_encode = content.getBytes("utf-8");
			// 9.根据密码器的初始化方式--加密：将数据加密
			byte[] byte_AES = cipher.doFinal(byte_encode);
			// 10.将加密后的数据转换为字符串
			// 这里用Base64Encoder中会找不到包
			// 解决办法：
			// 在项目的Build path中先移除JRE System Library，再添加库JRE System
			// Library，重新编译后就一切正常了。
			String AES_encode = new String(new BASE64Encoder().encode(byte_AES));
			// 11.将字符串返回
			return AES_encode;
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			e.printStackTrace();
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		// 如果有错就返加nulll
		return null;
	}

	/*
	 * 解密 解密过程： 1.同加密1-4步 2.将加密后的字符串反纺成byte[]数组 3.将加密内容解密
	 */
	public static String AESDncode(String encodeRules, String content) {
		try {
			// 1.构造密钥生成器，指定为AES算法,不区分大小写
			KeyGenerator keygen = KeyGenerator.getInstance("AES");
			// 2.根据ecnodeRules规则初始化密钥生成器
			// 生成一个128位的随机源,根据传入的字节数组
			keygen.init(128, new SecureRandom(encodeRules.getBytes()));
			// 3.产生原始对称密钥
			SecretKey original_key = keygen.generateKey();
			// 4.获得原始对称密钥的字节数组
			byte[] raw = original_key.getEncoded();
			// 5.根据字节数组生成AES密钥
			SecretKey key = new SecretKeySpec(raw, "AES");
			// 6.根据指定算法AES自成密码器
			Cipher cipher = Cipher.getInstance("AES");
			// 7.初始化密码器，第一个参数为加密(Encrypt_mode)或者解密(Decrypt_mode)操作，第二个参数为使用的KEY
			cipher.init(Cipher.DECRYPT_MODE, key);
			// 8.将加密并编码后的内容解码成字节数组
			byte[] byte_content = new BASE64Decoder().decodeBuffer(content);
			/*
			 * 解密
			 */
			byte[] byte_decode = cipher.doFinal(byte_content);
			String AES_decode = new String(byte_decode, "utf-8");
			return AES_decode;
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			e.printStackTrace();
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
		}

		// 如果有错就返加nulll
		return null;
	}
	/**
	 * 
	 * @time   2017年8月9日 下午5:02:52
	 * @author zuoqb
	 * @todo   根据用户名生成加密串
	 * @param  @param userName
	 * @param  @return
	 * @return_type   String
	 */
	public static String createSign(String userId){
		//拼接参数 格式 
		long time=System.currentTimeMillis();
		String info = "{\"userId\":\""+ userId +"\",\"encodeRules\":\""+ Constants.ENCODE_RULES+"\",\"time\":\""+ time +"\"}";
		String encode=AESSymmetricEncoder.AESEncode(Constants.ENCODE_RULES, info);
		//对称加密后可能包含+号这种特殊字符  会影响解析 所以需要再次编码
		if(StringUtils.isNotBlank(encode)){
			try {
				encode=java.net.URLEncoder.encode(java.net.URLEncoder.encode(encode, "UTF-8"), "UTF-8");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return encode;
	}
	/**
	 * 
	 * @time   2017年8月9日 下午5:29:23
	 * @author zuoqb
	 * @todo  校验签名合法
	 * @param  @param sign
	 * @param  @param userId
	 * @param  @return
	 * @return_type   boolean
	 */
	public static boolean checkSign(String sign,String userId){
		//安全性校验
		if(StringUtils.isEmpty(sign)){
			return false;
		}
		if(StringUtils.isEmpty(userId)){
			return false;
		}
		//对称加密后可能包含+号这种特殊字符  会影响解析 所以需要再次编码
		if(StringUtils.isNotBlank(sign)){
			try {
				sign=java.net.URLDecoder.decode(sign, "UTF-8");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		//解密
		String hlSign=AESSymmetricEncoder.AESDncode(Constants.ENCODE_RULES, sign);
		Map<String,Object> map=JsonKit.json2map(hlSign);
		if(map!=null){
			//验证加密规则 名字是否相同
			if(Constants.ENCODE_RULES.equals(map.get("encodeRules"))&&userId.equals(map.get("userId"))){
				Long time=Long.parseLong(map.get("time")+"");
				Long difference = (System.currentTimeMillis() - time) /1000;//时间差,单位秒
				if(difference<=8*60*60){
					// 验证时间 时间差超过8小时不让进入
					return true;
				}
				return false;
			}
			return false;
		}
		return false;
	}
	public static void main(String[] args) throws Exception {
	/*	String encode=AESSymmetricEncoder.AESEncode(Constants.ENCODE_RULES, "123");
		System.out.println(encode);
		String decode=AESSymmetricEncoder.AESDncode(Constants.ENCODE_RULES, encode);
		System.out.println(decode);*/
		String userName="-999";
		String e=createSign(userName);
		System.out.println(e);
		System.out.println(e.length());
		System.out.println(checkSign(java.net.URLDecoder.decode(e, "UTF-8"), userName+""));
	}
}
