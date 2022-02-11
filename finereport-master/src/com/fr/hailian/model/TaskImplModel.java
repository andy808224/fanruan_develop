package com.fr.hailian.model;

import java.io.Serializable;
/**
 * 
 * @className TaskModel.java
 * @time   2017年8月15日 上午10:11:36
 * @author zuoqb 
 * FR_PROCESS_TASK_IMPL
 * @todo   上报流程中的任务发下来的具体任务 实体
 */
public class TaskImplModel implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 6773344043865339897L;
	private String   id;//	  主键
	private String   taskId;//源task的id
	private String   processId;//	  流程id
	private String   operatorJson;//node上的第几个节点是多用户的
	private String   reportOffset;//第几个模板
	private String   operatorOffset;//多用户节点的第几个用户
	private String   needAllComplete;//是否需要全部完成
	private String   currentNodeIdx;//当前的流程节点id
	private String   createTime;//创建时间，确切的说是下发的时间
	private String   note;//备注
	//任务状态 初始:-1;等待上报:0;等待审核:1; 审核通过:2;被退回:3;已经关闭:4;超时:5;"
	private String   state;
	private String   sonTaskId;//子任务的id    [{nodeidx:0, userid:1, taskid:1}]
	private String   sendTime;//发送时间
	private String   senderId;//	 发送人id
	private String   completeState;// 已经完成任务的用户 针对多用户的节点的    {"report1.cpt":{"user1":1, "user2":0}, {}}
	private String   parentid;//父任务id
	private String   nodeRoute;// 节点走过的路径，json
	private String   alerted;//	 是否进行过预警
	private String   deadLine;//	 截止时间 如果不设置为null
	private String   sender;//	 发送人
	private String   operatorOffsetName;//	 多用户节点的第几个用户的名字
	private String   frTaskId;//$fr_task_id的实际值
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public String getProcessId() {
		return processId;
	}
	public void setProcessId(String processId) {
		this.processId = processId;
	}
	public String getOperatorJson() {
		return operatorJson;
	}
	public void setOperatorJson(String operatorJson) {
		this.operatorJson = operatorJson;
	}
	public String getReportOffset() {
		return reportOffset;
	}
	public void setReportOffset(String reportOffset) {
		this.reportOffset = reportOffset;
	}
	public String getOperatorOffset() {
		return operatorOffset;
	}
	public void setOperatorOffset(String operatorOffset) {
		this.operatorOffset = operatorOffset;
	}
	public String getNeedAllComplete() {
		return needAllComplete;
	}
	public void setNeedAllComplete(String needAllComplete) {
		this.needAllComplete = needAllComplete;
	}
	public String getCurrentNodeIdx() {
		return currentNodeIdx;
	}
	public void setCurrentNodeIdx(String currentNodeIdx) {
		this.currentNodeIdx = currentNodeIdx;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getSonTaskId() {
		return sonTaskId;
	}
	public void setSonTaskId(String sonTaskId) {
		this.sonTaskId = sonTaskId;
	}
	public String getSendTime() {
		return sendTime;
	}
	public void setSendTime(String sendTime) {
		this.sendTime = sendTime;
	}
	public String getSenderId() {
		return senderId;
	}
	public void setSenderId(String senderId) {
		this.senderId = senderId;
	}
	public String getCompleteState() {
		return completeState;
	}
	public void setCompleteState(String completeState) {
		this.completeState = completeState;
	}
	public String getParentid() {
		return parentid;
	}
	public void setParentid(String parentid) {
		this.parentid = parentid;
	}
	public String getNodeRoute() {
		return nodeRoute;
	}
	public void setNodeRoute(String nodeRoute) {
		this.nodeRoute = nodeRoute;
	}
	public String getAlerted() {
		return alerted;
	}
	public void setAlerted(String alerted) {
		this.alerted = alerted;
	}
	public String getDeadLine() {
		return deadLine;
	}
	public void setDeadLine(String deadLine) {
		this.deadLine = deadLine;
	}
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	public String getOperatorOffsetName() {
		return operatorOffsetName;
	}
	public void setOperatorOffsetName(String operatorOffsetName) {
		this.operatorOffsetName = operatorOffsetName;
	}
	public String getFrTaskId() {
		return frTaskId;
	}
	public void setFrTaskId(String frTaskId) {
		this.frTaskId = frTaskId;
	}
	

}
