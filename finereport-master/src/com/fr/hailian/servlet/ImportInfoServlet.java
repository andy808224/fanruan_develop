package com.fr.hailian.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.fr.fs.base.entity.User;
import com.fr.hailian.core.BaseServlet;
import com.fr.hailian.service.OrganizationService;
import com.fr.hailian.service.UserService;
import com.fr.hailian.util.RoleUtil;
import com.fr.stable.StringUtils;

/**
 * 
 * @className ImportInfoServlet.java
 * @time   2017年8月14日 下午3:07:03
 * @author zuoqb
 * @todo   导入人员 机构信息 
 * type:类型 0-人员 1-机构
 * filePath:文件路径
 */
public class ImportInfoServlet extends BaseServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8091436245999618392L;

	/**
	 * Constructor of the object.
	 */
	public ImportInfoServlet() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		overwriteImportInfo(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		overwriteImportInfo(request, response);
	}

	private void overwriteImportInfo(HttpServletRequest request, HttpServletResponse response) {
		JSONObject r = new JSONObject();
		String type = null;
		String filePath = null;
		try {
			type = java.net.URLDecoder.decode(request.getParameter("type"), "UTF-8");//type:类型 0-人员 1-机构
			filePath = java.net.URLDecoder.decode(request.getParameter("filePath"), "UTF-8");
			//System.out.println("filePath:"+filePath+",type="+type);
			if (StringUtils.isBlank(type)) {
				r.put("fail", false);
				r.put("msg", "参数不全，请选择导入信息类型 : 0-人员 1-机构");
				responseOutWithJson(response, r);
				return;
			}
			if (StringUtils.isBlank(filePath)) {
				r.put("fail", false);
				r.put("msg", "参数不全，请选择导入文件");
				responseOutWithJson(response, r);
				return;
			}
			User user = RoleUtil.getCurrentUser(request);
			if (user != null) {
				//type:类型 0-人员 1-机构
				if ("0".equals(type)) {
					//导入人员
					r = new JSONObject();
					r = UserService.getInstance().importUser(filePath);
				} else if ("1".equals(type)) {
					//导入机构
					r = new JSONObject();
					r = OrganizationService.getInstance().importOrganization(filePath);
				} else {
					r.put("fail", false);
					r.put("msg", "type类型只能为0或1 : 0-人员    1-机构");
				}

			} else {
				r.put("fail", true);
				r.put("msg", "请先登录！");
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		}//文件路径
		responseOutWithJson(response, r);
	}

	public void init() throws ServletException {
	}

}
