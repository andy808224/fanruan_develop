package com.fr.hailian.model;

import java.io.Serializable;

/**
 * 
 * @className UserModel.java
 * @time   2017年8月14日 上午10:53:42
 * @author zuoqb
 * @todo   用户实体
 */
public class UserModel implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 6201547131958870064L;
	private String id;//主键ID
	private String userName;//员工姓名
	private String password;//密码  默认123456
	private String orgCode;//组织编码
	private String orgName;//组织名字
	private String realName;
	private String email;
	
	
	public String getOrgName() {
		return orgName;
	}


	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}


	public String getRealName() {
		return realName;
	}
	public void setRealName(String realName) {
		this.realName = realName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getOrgCode() {
		return orgCode;
	}
	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}
}
