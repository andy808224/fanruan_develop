package com.fr.hailian.model;

import java.io.Serializable;

/**
 * 
 * @className OrganizationModel.java
 * @time   2017年8月15日 上午9:43:10
 * @author zuoqb
 * @todo   组织机构实体
 */
public class OrganizationModel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2264294461266991528L;
	private String id;//主键
	private String pid;//父键
	private String name;//名称
	private String des;//描述

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDes() {
		return des;
	}

	public void setDes(String des) {
		this.des = des;
	}

}
