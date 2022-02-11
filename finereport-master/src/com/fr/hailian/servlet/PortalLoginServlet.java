package com.fr.hailian.servlet;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.fr.fs.base.entity.User;
import com.fr.fs.control.UserControl;
import com.fr.hailian.core.BaseServlet;
import com.fr.hailian.util.PortalService;
import com.fr.hailian.util.RoleUtil;
/**
 * 
 * @className PortalLoginServlet.java
 * @time   2017年8月8日 下午6:03:52
 * @author zuoqb
 * @todo   单点登录逻辑
 */
public class PortalLoginServlet extends BaseServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8091436245999618392L;

	/**
	 * Constructor of the object.
	 */
	public PortalLoginServlet() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		overwriteLogin(request,response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		overwriteLogin(request,response);
	}

	private void overwriteLogin(HttpServletRequest request,
			HttpServletResponse response) {
		// TODO Auto-generated method stub
		JSONObject r=new JSONObject();
		//System.out.println("单点登录逻辑开始...... ");
		HttpServletRequest hrequest = (HttpServletRequest)request;//web资源
		String token=hrequest.getParameter("Token");//样例:FEEE591E3B55320B7038E74D4E4EFE86
		String redictUrl=hrequest.getParameter("Target");//样例:F047F50A72B04A049D8436009
		//System.out.println("Token="+token+",Target="+redictUrl);
		//根据token获取用户信息
		Map<String,Object> result = PortalService.getUserInfoByToken(token, redictUrl);
	/*	Map<String,Object> result =new HashMap<String, Object>();
		result.put("Result", "1");
		result.put("Memo", "admin");*/
		//System.out.println("根据token获取用户信息返回："+result);
		if(result!=null&&"1".equals(result.get("Result"))){
			String name = (String) result.get("Memo");//获取用户名，需进一步确认
			try {
				User user = UserControl.getInstance().getByUserName(name);//获取用户对象
//				System.out.println(user.toString());
				
				if(user!=null&&RoleUtil.judgeAuxiliaryRole(user)){
					//生成登陆凭证
					hrequest.setAttribute(com.fr.stable.Constants.FR_USERNAME, user.getUsername());
					hrequest.setAttribute(com.fr.stable.Constants.FR_PASSWORD, user.getPassword());
					RoleUtil.loginCMD(hrequest, response);
					//response.sendRedirect(redictUrl);
					r.put("fail", false);
					r.put("msg", "单点登录成功，Memo="+(String) result.get("Memo")+"Target:"+redictUrl);
				}else{
					r.put("fail", true);
					r.put("msg", "该用户没有辅助决策系统权限，请联系管理员!");
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}else{
			r.put("fail", true);
			r.put("msg", (String) result.get("Memo"));
		}
		responseOutWithJson(response, r);
	}

	public void init() throws ServletException {
		// Put your code here
		//System.out.println("单点登录逻辑初始化...... ");
	}

}