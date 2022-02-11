package com.fr.hailian.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.fr.fs.base.entity.User;
import com.fr.general.web.ParameterConsts;
import com.fr.hailian.core.BaseServlet;
import com.fr.hailian.model.UserModel;
import com.fr.hailian.service.TaskService;
import com.fr.hailian.util.DESSymmetricEncoder;
import com.fr.hailian.util.PortalService;
import com.fr.hailian.util.RoleUtil;
import com.fr.web.utils.WebUtils;

/**
 * 
 * @className RTXShareServlet.java
 * @time   2017年8月10日 下午3:24:44
 * @author zuoqb
 * @todo   RTX集成 多级上报提交分享后续处理
 */
public class RTXShareServlet extends BaseServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8091436245999618392L;

	/**
	 * Constructor of the object.
	 */
	public RTXShareServlet() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		overwriteReport(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		overwriteReport(request, response);
	}

	private void overwriteReport(HttpServletRequest request, HttpServletResponse response) {
		JSONObject r = new JSONObject();
		System.out.println("RTX集成 多级上报提交分享后续处理开始...... ");
		try {
			//用户名
			User user = RoleUtil.getCurrentUser(request);
			String domain = request.getParameter("domain");
			//帆软实际ID对应表fr_process_task_impl中frtaskid 实际值字段
			String frTaskId = request.getParameter("taskImpId");
			String __redirect__ = WebUtils.getHTTPRequestParameter(request, ParameterConsts.__REDIRECT__);//是否直接跳转到任务详情页面 true跳转
			//上报流程中的任务下发出来的具体任务ID  表fr_process_task_impl
			/*String name = java.net.URLDecoder.decode(request.getParameter(Constants.FR_USERNAME),"UTF-8");
			System.out.println("name:"+name);*/
			if (user != null) {
				String taskImpId = TaskService.getInstance().getTaskImplByFrtaskId(frTaskId);
				String[][] data = TaskService.getInstance().getTaskIdByFrtaskId(frTaskId);
				//获取下一级审核人信息
				List<UserModel> userList = TaskService.getInstance().getShareUser(taskImpId);
				//生成url地址 发送RTX信息使用
				List<String> successUser = new ArrayList<String>();
				List<String> failUser = new ArrayList<String>();
				for (UserModel u : userList) {
					String sign = DESSymmetricEncoder.createSign(u.getId() + "");
					String url = domain + "/rtxSecurityServlet?sign=" + sign + "&userId=" + u.getId();
					if ("true".equals(__redirect__)) {
						String hl_url = TaskService.getInstance().joinTaskUrl(data[0][4], data[0][2], taskImpId);
						url += "&__redirect__=" + __redirect__ + "&hl_url=" + hl_url;
					}
					System.out.println(u.getUserName());
					System.out.println(url);
					if (PortalService.sendMessageToUser(request, com.fr.hailian.core.Constants.RTX_TITLE,
							com.fr.hailian.core.Constants.RTX_CONTENT, url, u.getUserName())) {
						successUser.add(u.getUserName());
					} else {
						failUser.add(u.getUserName());
					}
					;
				}
				r.put("fail", false);
				r.put("msg", "发送RTX信息成功!" + successUser.toString());
			} else {
				//先登录
				r.put("fail", true);
				r.put("msg", "请先登录!");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		responseOutWithJson(response, r);
	}

	public void init() throws ServletException {
		//System.out.println("RTX集成 多级上报提交分享后续处理初始化...... ");
	}

}
