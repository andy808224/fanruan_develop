package com.fr.hailian.wsdl;

import java.util.Map;

import javax.jws.WebParam;
import javax.jws.WebService;

import com.alibaba.fastjson.JSONObject;
import com.fr.hailian.service.TaskService;
import com.fr.hailian.util.JsonKit;
import com.fr.stable.StringUtils;
/**
 * 
 * @className TaskWebService.java
 * @time   2017年8月13日 下午6:31:38
 * @author zuoqb
 * @todo   统一待办 已办WebService接口
 */
@WebService
public class TaskWebService {
	@SuppressWarnings("finally")
	public String getTask(@WebParam(name = "info", mode = WebParam.Mode.IN) String info) {
		JSONObject result=new JSONObject();
		if(StringUtils.isBlank(info)){
			result.put("result", 0);
			result.put("memo", "参数不能为空！");
			return result.toString();
		}
		try {
			Map<String,Object> map=JsonKit.json2map(info);
			if(map.get("uid")==null||StringUtils.isBlank(map.get("uid")+"")){
				result.put("result", 0);
				result.put("memo", "请输入用户ID");
			}else{
				result=TaskService.getInstance().getTask(map);
			}
		} catch (Exception e) {
			result.put("result", 0);
			result.put("memo", "请输入正确的json格式");
		}finally{
			return result.toString();
		}
	}
	public static void main(String[] args) {
		//{"flag":"1","page":1,"pageSize":10,"startTime":"2017-01-22","title":"流程","type":"1","uid":"47"}
		JSONObject o=new JSONObject();
		o.put("uid", "47");//用户账号
		o.put("type","1");//请求类型	1:待办事宜；2：已办事宜
		o.put("flag","1");//是否查询明细	1：是；0：否（当为1时需返回具体的记录内容；当为0时只需返回查询结果的总条数）
		o.put("startTime","2017-01-22");//流程发起时间	返回流程发起时间在starttime至今之间的数据（为null时查询所有）
		o.put("title","流程");//流程标题	返回标题中带有title的数据（为null时查询所有）
		o.put("page",1);//第几页	根据page请求第几页的数据。
		o.put("pageSize",10);//每页大小	每页请求的条数（例如每页10条）
		System.out.println(o.toString());
	}
}
