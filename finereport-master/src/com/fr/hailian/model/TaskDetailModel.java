package com.fr.hailian.model;

import java.io.Serializable;

/**
 * 
 * @className TaskDetailModel.java
 * @time   2017年8月16日 下午4:38:29
 * @author zuoqb
 * @todo   wsdl已办待办返回实体对象
 * 返回结果集要求
 * 默认按流程发起时间（StartTime）降序;信息时间(SendTime)降序.
 */
public class TaskDetailModel  implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -416751360593539186L;
	private String subject;//是	能够明确表达审批对象，简洁直观，可为源系统中记录的标题。例如：“关于........的通知流程”、“资产采购审批流程”。
	private String sendTime;//是	 本消息产生的时间，即上一节点审批完成时间符合标准的时间格式，精确到秒（无秒的补0）。例如：“2016-2-2615：01：00”。
	private String fromUser;// 否	取统一用户编码（员工工号）。例如：“12099”。
	private String startTime;//是	符合标准的时间格式，精确到秒（无秒的补0）。例如：“2016-2-2615：01：00”。
	private String fromUserName;//是	系统中流程发起人的姓名。例如：“张三”。
	private String fromDept;//否	发起人部门名称。例如：“信息科技部”。
	private String urgentLevel;//否	各系统中的紧急标识字段。例如：“紧急”、“加急”……。
	private String tel;//否	流程发起人电话
	private String url;//访问该记录的操作连接
	/** 
	 *  是	消息源 约定数据字典：
	 *  1：办公OA
		2：人力资源
		3：设计项目
		4：经营合同
		5：网上报销
		6：项目管理
	 */
	
	private String source;
	public TaskDetailModel() {
		super();
	}
	public TaskDetailModel(String subject, String sendTime, String fromUser,
			String startTime, String fromUserName, String fromDept, String tel,String url) {
		super();
		this.subject = subject;
		this.sendTime = sendTime;
		this.fromUser = fromUser;
		this.startTime = startTime;
		this.fromUserName = fromUserName;
		this.fromDept = fromDept;
		this.tel = tel;
		this.url=url;
		this.urgentLevel="普通";
		this.source="1";
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getSendTime() {
		return sendTime;
	}
	public void setSendTime(String sendTime) {
		this.sendTime = sendTime;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getFromUser() {
		return fromUser;
	}
	public void setFromUser(String fromUser) {
		this.fromUser = fromUser;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getFromUserName() {
		return fromUserName;
	}
	public void setFromUserName(String fromUserName) {
		this.fromUserName = fromUserName;
	}
	public String getFromDept() {
		return fromDept;
	}
	public void setFromDept(String fromDept) {
		this.fromDept = fromDept;
	}
	public String getUrgentLevel() {
		return urgentLevel;
	}
	public void setUrgentLevel(String urgentLevel) {
		this.urgentLevel = urgentLevel;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
		

}
