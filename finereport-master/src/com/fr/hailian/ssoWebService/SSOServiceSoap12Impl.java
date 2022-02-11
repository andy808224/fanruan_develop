
/**
 * Please modify this class to meet your needs
 * This class is not complete
 */

package com.fr.hailian.ssoWebService;

import java.util.logging.Logger;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.ResponseWrapper;

/**
 * This class was generated by Apache CXF 3.1.12
 * 2017-08-08T15:22:48.118+08:00
 * Generated source version: 3.1.12
 * 
 */

@javax.jws.WebService(
                      serviceName = "SSOService",
                      portName = "SSOServiceSoap12",
                      targetNamespace = "http://sso.nwh.cn",
                      wsdlLocation = "http://10.0.6.19:8008/SSOService.asmx?WSDL",
                      endpointInterface = "com.fr.hailiann.webservice.SSOServiceSoap")
                      
public class SSOServiceSoap12Impl implements SSOServiceSoap {

    private static final Logger LOG = Logger.getLogger(SSOServiceSoap12Impl.class.getName());

    /* (non-Javadoc)
     * @see com.fr.hailiann.webservice.SSOServiceSoap#getTargetEntry(java.lang.String info)*
     */
    public java.lang.String getTargetEntry(java.lang.String info) { 
        LOG.info("Executing operation getTargetEntry");
        System.out.println(info);
        try {
            java.lang.String _return = "";
            return _return;
        } catch (java.lang.Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
    }

    /* (non-Javadoc)
     * @see com.fr.hailiann.webservice.SSOServiceSoap#getUserInfoByToken(java.lang.String info)*
     */
    public java.lang.String getUserInfoByToken(java.lang.String info) { 
        LOG.info("Executing operation getUserInfoByToken");
        System.out.println(info);
        try {
            java.lang.String _return = "";
            return _return;
        } catch (java.lang.Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
    }

    /* (non-Javadoc)
     * @see com.fr.hailiann.webservice.SSOServiceSoap#helloWorld(java.lang.String msg)*
     */
    public java.lang.String helloWorld(java.lang.String msg) { 
        LOG.info("Executing operation helloWorld");
        System.out.println(msg);
        try {
            java.lang.String _return = "";
            return _return;
        } catch (java.lang.Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
    }

    /* (non-Javadoc)
     * @see com.fr.hailiann.webservice.SSOServiceSoap#changePassword(java.lang.String loginName, java.lang.String oldPasswd, java.lang.String newPasswd)*
     */
    public java.lang.String changePassword(java.lang.String loginName, java.lang.String oldPasswd, java.lang.String newPasswd) { 
        LOG.info("Executing operation changePassword");
        System.out.println(loginName);
        System.out.println(oldPasswd);
        System.out.println(newPasswd);
        try {
            java.lang.String _return = "";
            return _return;
        } catch (java.lang.Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
    }

    /* (non-Javadoc)
     * @see com.fr.hailiann.webservice.SSOServiceSoap#getUserResource(java.lang.String info)*
     */
    public java.lang.String getUserResource(java.lang.String info) { 
        LOG.info("Executing operation getUserResource");
        System.out.println(info);
        try {
            java.lang.String _return = "";
            return _return;
        } catch (java.lang.Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
    }

    /* (non-Javadoc)
     * @see com.fr.hailiann.webservice.SSOServiceSoap#getUserState(java.lang.String loginName)*
     */
    public java.lang.String getUserState(java.lang.String loginName) { 
        LOG.info("Executing operation getUserState");
        System.out.println(loginName);
        try {
            java.lang.String _return = "";
            return _return;
        } catch (java.lang.Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
    }

    /* (non-Javadoc)
     * @see com.fr.hailiann.webservice.SSOServiceSoap#userValidate(java.lang.String info)*
     */
    public java.lang.String userValidate(java.lang.String info) { 
        LOG.info("Executing operation userValidate");
        System.out.println(info);
        try {
            java.lang.String _return = "";
            return _return;
        } catch (java.lang.Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
    }

    /* (non-Javadoc)
     * @see com.fr.hailiann.webservice.SSOServiceSoap#logout(java.lang.String info)*
     */
    public java.lang.String logout(java.lang.String info) { 
        LOG.info("Executing operation logout");
        System.out.println(info);
        try {
            java.lang.String _return = "";
            return _return;
        } catch (java.lang.Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
    }

}
