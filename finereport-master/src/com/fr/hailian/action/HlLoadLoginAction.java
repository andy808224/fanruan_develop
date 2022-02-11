package com.fr.hailian.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fr.base.TemplateUtils;
import com.fr.cluster.stable.ClusterState;
import com.fr.file.BaseClusterHelper;
import com.fr.file.ClusterConfigManager;
import com.fr.file.ClusterService;
import com.fr.fs.base.entity.UserInfo;
import com.fr.fs.web.AuthenticationHelper;
import com.fr.fs.web.FSConstants;
import com.fr.fs.web.service.FSLoadLoginAction;
import com.fr.general.ComparatorUtils;
import com.fr.general.web.ParameterConsts;
import com.fr.json.JSONException;
import com.fr.json.JSONObject;
import com.fr.stable.Constants;
import com.fr.stable.StringUtils;
import com.fr.web.cluster.ClusterManager;
import com.fr.web.utils.WebUtils;

/**
 * 
 * @className FRFilter.java
 * @time   2017年8月7日 下午2:15:22
 * @author zuoqb
 * @todo   登陆重构
 */
public class HlLoadLoginAction extends FSLoadLoginAction {

	/**
	 * fs（平台）登陆时的相关操作
	 *
	 * @param req 登录请求
	 * @param res 返回响应
	 * @throws Exception
	 */
	public void actionCMD(HttpServletRequest req, HttpServletResponse res) throws Exception {
		String username = WebUtils.getHTTPRequestParameter(req, Constants.FR_USERNAME);
		String password = WebUtils.getHTTPRequestParameter(req, Constants.FR_PASSWORD);
		String remember = WebUtils.getHTTPRequestParameter(req, Constants.REMEMBER);

		//是否是过来验证模板是否有权限的
		HttpSession session = req.getSession(true);
		boolean isTemplate = ComparatorUtils.equals(true, session.getAttribute("isTemplate"));
		PrintWriter writer = createWriter(res);
		//System.out.println("actionCMD");
		if (dealLoginInfo(req, res, username, password, isTemplate)) {
			UserInfo ui = new UserInfo(username, password, Boolean.valueOf(remember));
			ui.dealBrowserCookies(res, session);
			Object oo = session.getAttribute(isTemplate ? Constants.PF.TEMPLATE_ORIGINAL_URL : Constants.ORIGINAL_URL);
			//wei : 跨域的时候如果返回相对路径，就又跳到跨域前的url+op=fs了。
			String url = (oo == null) ? getRenderedUrl() : oo.toString() + "&_=" + System.currentTimeMillis();
			if (StringUtils.isNotBlank(req.getParameter("hl_url"))) {
				url = req.getParameter("hl_url");
				//url=java.net.URLDecoder.decode(url, "UTF-8");
				url = url.replaceAll("@@", "&");
			}
			addServerID(session);
			//System.out.println("url:" + url);
			signOnSuccess(req, res, writer, url);
		} else {
			signOnFailure(req, writer);
		}
		writer.flush();
		writer.close();
	}

	private void addServerID(HttpSession session) {
		if (ClusterConfigManager.getInstance().isUseCluster()) {
			ClusterService mainService = ClusterManager.getInstance().getMainService();
			String serviceName = mainService.getServiceName() + "_" + System.currentTimeMillis();
			session.setAttribute(FSConstants.SERVER_ID, serviceName);
		}
	}

	protected PrintWriter createWriter(HttpServletResponse res) throws Exception {
		return WebUtils.createPrintWriter(res);
	}

	protected boolean dealLoginInfo(HttpServletRequest req, HttpServletResponse res, String username, String password,
			boolean isTemplate) throws Exception {
		//return AbstractFSAuthService.dealLoginInfo(req, res, username, password, isTemplate);
		return AuthenticationHelper.dealLoginInfo(req, res, username, password, isTemplate);
	}

	protected void signOnSuccess(HttpServletRequest req, HttpServletResponse res, PrintWriter writer, String url)
			throws IOException, JSONException {
		if ("true".equals(WebUtils.getHTTPRequestParameter(req, ParameterConsts.__REDIRECT__))) {
			res.sendRedirect(url);
		} else {
			writer.print(JSONObject.create().put("url", url).put("fail", false));
		}
	}

	protected void signOnFailure(HttpServletRequest req, PrintWriter writer) throws JSONException {
		writer.print(JSONObject.create().put("fail", true));
	}

	public String getCMD() {
		return "login";
	}

	protected String getRenderedUrl() throws Exception {
		Map<String, Object> para = new HashMap<String, Object>();
		if (BaseClusterHelper.getClusterState() == ClusterState.LEADER) {
			para.put("serverURL", "http://" + ClusterConfigManager.getInstance().getPublicURL());
		}
		//return TemplateUtils.renderParameter4Tpl("${serverURL}${servletURL}?op=fs", para);
		//        return TemplateUtils.renderParameter4Tpl("/WebReport/ReportServer?op=fs", para);
		//tomcat做了虚拟目录配置，此处跳转地址去掉/WebReport
		return TemplateUtils.renderParameter4Tpl(com.fr.hailian.core.Constants.CTX_PATH + "/ReportServer?op=fs", para);
	}
}
