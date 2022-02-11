
package com.fr.hailian.ssoWebService;

import javax.xml.bind.annotation.XmlRegistry;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.fr.hailiann.webservice package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {


    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.fr.hailiann.webservice
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link HelloWorld }
     * 
     */
    public HelloWorld createHelloWorld() {
        return new HelloWorld();
    }

    /**
     * Create an instance of {@link HelloWorldResponse }
     * 
     */
    public HelloWorldResponse createHelloWorldResponse() {
        return new HelloWorldResponse();
    }

    /**
     * Create an instance of {@link UserValidate }
     * 
     */
    public UserValidate createUserValidate() {
        return new UserValidate();
    }

    /**
     * Create an instance of {@link UserValidateResponse }
     * 
     */
    public UserValidateResponse createUserValidateResponse() {
        return new UserValidateResponse();
    }

    /**
     * Create an instance of {@link ChangePassword }
     * 
     */
    public ChangePassword createChangePassword() {
        return new ChangePassword();
    }

    /**
     * Create an instance of {@link ChangePasswordResponse }
     * 
     */
    public ChangePasswordResponse createChangePasswordResponse() {
        return new ChangePasswordResponse();
    }

    /**
     * Create an instance of {@link Logout }
     * 
     */
    public Logout createLogout() {
        return new Logout();
    }

    /**
     * Create an instance of {@link LogoutResponse }
     * 
     */
    public LogoutResponse createLogoutResponse() {
        return new LogoutResponse();
    }

    /**
     * Create an instance of {@link GetTargetEntry }
     * 
     */
    public GetTargetEntry createGetTargetEntry() {
        return new GetTargetEntry();
    }

    /**
     * Create an instance of {@link GetTargetEntryResponse }
     * 
     */
    public GetTargetEntryResponse createGetTargetEntryResponse() {
        return new GetTargetEntryResponse();
    }

    /**
     * Create an instance of {@link GetUserInfoByToken }
     * 
     */
    public GetUserInfoByToken createGetUserInfoByToken() {
        return new GetUserInfoByToken();
    }

    /**
     * Create an instance of {@link GetUserInfoByTokenResponse }
     * 
     */
    public GetUserInfoByTokenResponse createGetUserInfoByTokenResponse() {
        return new GetUserInfoByTokenResponse();
    }

    /**
     * Create an instance of {@link GetUserState }
     * 
     */
    public GetUserState createGetUserState() {
        return new GetUserState();
    }

    /**
     * Create an instance of {@link GetUserStateResponse }
     * 
     */
    public GetUserStateResponse createGetUserStateResponse() {
        return new GetUserStateResponse();
    }

    /**
     * Create an instance of {@link GetUserResource }
     * 
     */
    public GetUserResource createGetUserResource() {
        return new GetUserResource();
    }

    /**
     * Create an instance of {@link GetUserResourceResponse }
     * 
     */
    public GetUserResourceResponse createGetUserResourceResponse() {
        return new GetUserResourceResponse();
    }

}
