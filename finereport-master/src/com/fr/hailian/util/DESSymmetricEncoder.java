package com.fr.hailian.util;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.Map;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;

import com.fr.hailian.core.Constants;
import com.fr.stable.StringUtils;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;
/**
 * 
 * @className DESSymmetricEncoder.java
 * @time   2017年8月14日 上午9:45:25
 * @author zuoqb
 * @todo   DES签名工具类
 */
public class DESSymmetricEncoder {
	 private final static String DES = "DES";
	 private final static String ENCODE = "UTF-8";
	 public static void main(String[] args) throws Exception {
	        String userName="-999";
			String e=createSign(userName);
			System.out.println(e);
			//http://localhost:8075/WebReport/rtxSecurityServlet?sign=d%252FLWhfP96RCI13XIu0t8v8UgTCMG6H7g%252BdNYloUHI5NyVlqBHmNk6fvu%252F8%252FQ1zGciGqYdNJr1KMC%250D%250A0ZOvpeWL45gB4miQh00OGZRtgpGOYdlM1ZnPRc7hVgkMH8t%252B0dPs&userId=-999
			System.out.println(checkSign(java.net.URLDecoder.decode(e, "UTF-8"), userName));

	    }

	 /**
     * 使用 默认key 加密
     * 
     * @return String
     * @author lifq
     * @date 2015-3-17 下午02:46:43
     */
    public static String encrypt(String data) throws Exception {
        byte[] bt = encrypt(data.getBytes(ENCODE),  Constants.ENCODE_RULES.getBytes(ENCODE));
        String strs = new BASE64Encoder().encode(bt);
        return strs;
    }

    /**
     * 使用 默认key 解密
     * 
     * @return String
     * @author lifq
     * @date 2015-3-17 下午02:49:52
     */
    public static String decrypt(String data) throws IOException, Exception {
        if (data == null)
            return null;
        BASE64Decoder decoder = new BASE64Decoder();
        byte[] buf = decoder.decodeBuffer(data);
        byte[] bt = decrypt(buf,  Constants.ENCODE_RULES.getBytes(ENCODE));
        return new String(bt, ENCODE);
    }

    /**
     * Description 根据键值进行加密
     * 
     * @param data
     * @param key
     *            加密键byte数组
     * @return
     * @throws Exception
     */
    public static String encrypt(String data, String key) throws Exception {
        byte[] bt = encrypt(data.getBytes(ENCODE),  Constants.ENCODE_RULES.getBytes(ENCODE));
        String strs = new BASE64Encoder().encode(bt);
        return strs;
    }

    /**
     * Description 根据键值进行解密
     * 
     * @param data
     * @param key
     *            加密键byte数组
     * @return
     * @throws IOException
     * @throws Exception
     */
    public static String decrypt(String data, String key) throws IOException,
            Exception {
        if (data == null)
            return null;
        BASE64Decoder decoder = new BASE64Decoder();
        byte[] buf = decoder.decodeBuffer(data);
        byte[] bt = decrypt(buf, key.getBytes(ENCODE));
        return new String(bt, ENCODE);
    }

    /**
     * Description 根据键值进行加密
     * 
     * @param data
     * @param key
     *            加密键byte数组
     * @return
     * @throws Exception
     */
    private static byte[] encrypt(byte[] data, byte[] key) throws Exception {
        // 生成一个可信任的随机数源
        SecureRandom sr = new SecureRandom();

        // 从原始密钥数据创建DESKeySpec对象
        DESKeySpec dks = new DESKeySpec(key);

        // 创建一个密钥工厂，然后用它把DESKeySpec转换成SecretKey对象
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(DES);
        SecretKey securekey = keyFactory.generateSecret(dks);

        // Cipher对象实际完成加密操作
        Cipher cipher = Cipher.getInstance(DES);

        // 用密钥初始化Cipher对象
        cipher.init(Cipher.ENCRYPT_MODE, securekey, sr);

        return cipher.doFinal(data);
    }

    /**
     * Description 根据键值进行解密
     * 
     * @param data
     * @param key
     *            加密键byte数组
     * @return
     * @throws Exception
     */
    private static byte[] decrypt(byte[] data, byte[] key) throws Exception {
        // 生成一个可信任的随机数源
        SecureRandom sr = new SecureRandom();

        // 从原始密钥数据创建DESKeySpec对象
        DESKeySpec dks = new DESKeySpec(key);

        // 创建一个密钥工厂，然后用它把DESKeySpec转换成SecretKey对象
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(DES);
        SecretKey securekey = keyFactory.generateSecret(dks);

        // Cipher对象实际完成解密操作
        Cipher cipher = Cipher.getInstance(DES);

        // 用密钥初始化Cipher对象
        cipher.init(Cipher.DECRYPT_MODE, securekey, sr);

        return cipher.doFinal(data);
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
		String encode=null;
		try {
		encode=DESSymmetricEncoder.encrypt(info);
		//对称加密后可能包含+号这种特殊字符  会影响解析 所以需要再次编码
		if(StringUtils.isNotBlank(encode)){
				encode=java.net.URLEncoder.encode(java.net.URLEncoder.encode(encode, "UTF-8"), "UTF-8");
		}
		} catch (Exception e) {
			e.printStackTrace();
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
		try {
			//解密
			String hlSign=DESSymmetricEncoder.decrypt(sign);
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
		} catch (Exception e) {
		}
		return false;
	}
}
