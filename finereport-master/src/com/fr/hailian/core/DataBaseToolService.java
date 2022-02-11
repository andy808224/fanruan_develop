package com.fr.hailian.core;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.fr.hailian.util.C3P0Utils;
import com.fr.hailian.util.StringHelper;

public class DataBaseToolService {

	public static String geiInsertDBDate() throws SQLException, Exception {
		String res = "";
		String inserDBTime = "";
		Date date = new Date();
		SimpleDateFormat dateFm = new SimpleDateFormat("EEEE");
		String aa = dateFm.format(date);
		if ("乱码，不知道什么东西".equals(aa)) {
			res = "select convert(varchar,dateadd(dd,-7,dateadd(day, 6-datepart(weekday,getdate()),getdate())),120)";
		} else {
			res = "select convert(varchar,dateadd(day, 6-datepart(weekday,getdate()),getdate()),120)";
		}
		String[][] query = DataBaseToolService.getQueryResultBySql(res);
		inserDBTime = query[0][0];
		return inserDBTime;
	}

	public static boolean ifExistsBySql(String sql) throws SQLException, Exception {
		String[][] goodsIdList = DataBaseToolService.getQueryResultBySql(sql);
		if (goodsIdList.length > 0) {
			return true;
		} else {
			return false;
		}
	}

	// 脛脙碌陆脢媒戮脻驴芒脕卢陆脫脰麓脨脨sql脫茂戮盲虏垄路碌禄脴陆谩鹿没
	public static String[][] getQueryResultBySql(String sql) throws SQLException {
		Connection conn = null;
		String[][] result = null;
		PreparedStatement ps = null;
		try {
			conn = C3P0Utils.getInstance().getConnection();
			ps = conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();
			result = StringHelper.convertResult(rs);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("执行错误！");
		} finally {
			if (null != ps) {

				ps.close();
			}
			if (null != conn) {
				conn.close();
			}
		}
		return result;
	}

	public static String[][] getQueryResultBySql(String sql, String url, String username, String password)
			throws SQLException {
		Connection conn = null;
		String[][] result = null;
		PreparedStatement ps = null;
		try {
			conn = C3P0Utils.getInstance().getConnection();
			ps = conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();
			result = StringHelper.convertResult(rs);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("执行错误！");
		} finally {
			if (null != ps) {

				ps.close();
			}
			if (null != conn) {
				conn.close();
			}
		}
		return result;
	}

	// 脛脙碌陆脢媒戮脻驴芒脕卢陆脫脰麓脨脨sql脫茂戮盲
	public static void excuteBySql(String sql) throws SQLException {
		Connection conn = null;
		PreparedStatement ps = null;
		try {
			conn = C3P0Utils.getInstance().getConnection();
			ps = conn.prepareStatement(sql);
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("执行错误！");
		} finally {
			if (null != ps) {

				ps.close();
			}
			if (null != conn) {
				conn.close();
			}
		}

	}

	public static void excuteBySql(String sql, String url, String username, String password) throws SQLException {
		Connection conn = null;
		PreparedStatement ps = null;
		try {
			conn = C3P0Utils.getInstance().getConnection();
			ps = conn.prepareStatement(sql);
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("执行错误！");
		} finally {
			if (null != ps) {

				ps.close();
			}
			if (null != conn) {
				conn.close();
			}
		}
	}

	// 鎵瑰鐞嗘墽琛屾暟鎹簱璇彞
	public static void excuteBySqlBatch(List<String> sqls) throws Exception {
		Connection conn = null;
		Statement state = null;
		try {
			conn = C3P0Utils.getInstance().getConnection();
			state = conn.createStatement();
			for (String temSql : sqls) {

				state.addBatch(temSql);
			}
			state.executeBatch();
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("执行错误！");
		} finally {

			if (null != state) {

				state.close();
			}

			if (null != conn) {

				conn.close();
			}
		}
	}

	// 鎵ц娌℃湁杩斿洖缁撴灉鐨勫瓨鍌ㄨ繃绋�
	public static void excuteProBySql(String sql) throws SQLException {
		Connection conn = null;
		CallableStatement cs = null;
		try {
			conn = C3P0Utils.getInstance().getConnection();
			cs = conn.prepareCall(sql);
			cs.execute();
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("执行错误！");
		} finally {
			if (null != cs) {

				cs.close();
			}
			if (null != conn) {
				conn.close();
			}
		}
	}

	// 脰麓脨脨脫脨路碌禄脴陆谩鹿没碌脛麓忙麓垄鹿媒鲁脤
	public static String[][] excuteResultProBySql(String sql) throws SQLException {
		Connection conn = null;
		String[][] result = null;
		CallableStatement cs = null;
		try {
			conn = C3P0Utils.getInstance().getConnection();
			cs = conn.prepareCall(sql);
			ResultSet rs = cs.executeQuery();
			result = StringHelper.convertResult(rs);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("执行错误！");
		} finally {
			if (null != cs) {

				cs.close();
			}
			if (null != conn) {
				conn.close();
			}
		}
		return result;
	}

	public static boolean ifExistsByIdAndTable(String id, String tableName, String columnName) throws SQLException,
			Exception {
		return ifExistsBySql("select * from " + tableName + " where " + columnName + "='" + id + "'");
	}
}
