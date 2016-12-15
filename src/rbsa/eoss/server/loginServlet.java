/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rbsa.eoss.server;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.channels.Channels;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;
import java.util.Random;
import java.util.Stack;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
//import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.Base64;

import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.annotation.*;
import static com.googlecode.objectify.ObjectifyService.ofy;

import rbsa.eoss.Result;
import rbsa.eoss.ResultCollection;
import rbsa.eoss.server.loginServlet.account;
import rbsa.eoss.server.resultsGUIServlet.archEvalResults;


//import madkitdemo3.AgentEvaluationCounter;


/**
 *
 * @author Bang
 */
public class loginServlet extends HttpServlet {
	
    private String CLIENT_ID = "564804694787-lnsp9md3u0q8086nftbamu43drid6d4t.apps.googleusercontent.com";
    private String[] CLIENT_ID_List = new String[1];
    
    private static loginServlet instance=null;
	private int testType;
	private Checker checker;
	
    @Override
    public void init() throws ServletException{ 
    	instance = this;
    	testType = 1;
    	CLIENT_ID_List[0] = CLIENT_ID;
    	ObjectifyService.register(account.class);
//    	account acc = ofy().load().type(account.class).filter("googleIDToken","hb398@cornell.edu").first().now();
//    	if(acc!=null){
//    		ofy().delete().entity(acc).now();
//    	}
    }
    
    
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet jessCommandServlet</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet jessCommandServlet at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }
    
    
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    	
        String requestID = request.getParameter("ID");
        String outputString = "";

        
    	if (requestID.equalsIgnoreCase("login")){
                
	    	boolean accessGranted = false;
	        
	        System.out.println("----- Login -----");
	        String inputIDToken = request.getParameter("IDToken");
	        String loginTime = request.getParameter("loginTime");
	        	        
	        checker = new Checker(CLIENT_ID_List,"");
	        GoogleIdToken.Payload pl = checker.check(inputIDToken);
	        
	        if(checker.isVerified()){
	        	accessGranted = true;
	        	account acc = ofy().load().type(account.class).filter("email",pl.getEmail()).first().now();

	            if(acc!=null){    // Logged in before

	            	int n = acc.getLoginTrial();
	            	acc.setLoginTrial(n+1);
	            	ofy().save().entity(acc);
	            	
	            	if(acc.getTutorialFinished()){
	            		accessGranted=false;
	            	}else{
		            	String type = acc.getType();
		            	String key = acc.getAccountID();
		            	outputString = type + "-" + key;
	            	}
	            } else{   // logging in for the first time
	                
	            	//saving the account info in the database
	    	        account a1 = new account();
	    	        a1.setEmail(pl.getEmail());
	    	        a1.setLoginTime(loginTime);
	    	        a1.setType(Integer.toString(testType));
	    	        a1.setLoginTrial(1);
	    	        a1.setTutorialFinished(false);
	    	        
	    	        String key = "";
    		        for (int i=0;i<3;i++){
    		        	int rand = (int) (Math.random()*10);
    		        	key = key + rand;
    		        }
    		        key = key + Integer.toString(testType);
    		        for (int i=0;i<6;i++){
    		        	int rand = (int) (Math.random()*10);
    		        	key = key + rand;
    		        }
    		        key = key + "717038028138";
	    	        
    		        a1.setAccountID(key);
	    	        ofy().save().entity(a1);

	    	        
	    	        outputString = Integer.toString(testType) + "-" + key;
	    	        
	    	    	if(testType==3){
	    	    		testType = 1;
	    	    	} else{
	    	    		testType += 1;
	    	    	}

	            }
	        }
	        
	        
	        if(!accessGranted){
	        	outputString="accessDenied";
	        }
    	} 
    	
    	if(requestID.equalsIgnoreCase("credential_check")){
    		
	        String account_id_string = request.getParameter("account_id");
	        String testType_to_be_tested = request.getParameter("testType");

	        System.out.println(account_id_string);
	        System.out.println(testType_to_be_tested);
	        
	        
	        account acc = ofy().load().type(account.class).filter("accountID",account_id_string).first().now();
	        
	        if(acc.getTutorialFinished() || !testType_to_be_tested.equalsIgnoreCase(acc.getType())){
	        	outputString="accessDenied";
	        }else{
	        	outputString="accessGranted";
	        }
	        
        	outputString="accessGranted";
    	}
    	
    	
    	if (requestID.equalsIgnoreCase("session_ended")){
    		
    		System.out.println("-----Tutorial Finished-----");
    		
	        String account_id_string = request.getParameter("account_id");
	        String tutorial_finish_time = request.getParameter("tutorial_finish_time");

	        account acc = ofy().load().type(account.class).filter("accountID",account_id_string).first().now();
	        acc.setTutorialFinishTime(tutorial_finish_time);
	        acc.setTutorialFinished(true);
        	ofy().save().entity(acc);
        	
	        outputString="";
    	}
    	


        response.flushBuffer();
        response.setContentType("text/html");
        response.setHeader("Cache-Control", "no-cache");
        response.getWriter().write(outputString);

//        Put things back
//        System.out.flush();
//        System.setOut(old);
//        Show what happened
//        System.out.println("Intercepted text:" + baos.toString());
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    
    
    public static loginServlet getInstance()
    {
        if( instance == null ) 
        {
            instance = new loginServlet();
        }
        return instance;
    }
    
    public class Checker {

    	private final List mClientIDs;
    	private final String mAudience;
    	private final GoogleIdTokenVerifier mVerifier;
    	private final JsonFactory mJFactory;
    	private String mProblem = "Verification failed. (Time-out?)";
    	private boolean verified;

    	public Checker(String[] clientIDs, String audience) {
    	    mClientIDs = Arrays.asList(clientIDs);
    	    mAudience = audience;
    	    NetHttpTransport transport = new NetHttpTransport();
    	    mJFactory = new GsonFactory();
    	    mVerifier = new GoogleIdTokenVerifier(transport, mJFactory);
    	    verified = false;
    	}

    	public GoogleIdToken.Payload check(String tokenString) {
    	    GoogleIdToken.Payload payload = null;
    	    try {
    	        GoogleIdToken token = GoogleIdToken.parse(mJFactory, tokenString);
    	        if (mVerifier.verify(token)) {
    	        	verified = true;
    	        	GoogleIdToken.Payload tempPayload = token.getPayload();
    	        	System.out.println("Credential verified: " + tempPayload.getEmail());
//    	            System.out.println(tempPayload.getUserId());
     
//    	            String to = "hb398@cornell.edu";
//    	            String from = "hb398@cornell.edu";
//    	            String subject = "this is the subject";
//    	            String bodyText = "and this is the body!!!";
//    	            String userID = tempPayload.getUserId();
    	           

//    	            if (!tempPayload.getAudience().equals(mAudience))
//    	                mProblem = "Audience mismatch";
//    	            else 
    	            	if (!mClientIDs.contains(tempPayload.getIssuee()))
    	                mProblem = "Client ID mismatch";
    	            else
    	                payload = tempPayload;
    	        }
    	    } catch (GeneralSecurityException e) {
    	        mProblem = "Security issue: " + e.getLocalizedMessage();
    	    } catch (IOException e) {
    	        mProblem = "Network problem: " + e.getLocalizedMessage();
    	    }
    	    return payload;
    	}
    	
    	public boolean isVerified(){
    		return verified;
    	}

    	public String problem() {
    	    return mProblem;
    	}
    }
    
 
    
    
    @Entity
    public static class account{
    	
    	@Id Long id;
    	@Index String email;
    	@Index String type;
    	@Index String accountID;
    	String loginTime;
    	String tutorialFinishTime;
    	boolean tutorialFinished;
    	int loginTrial;

    	public account(){
    		loginTrial=0;
    	}
    	public void setEmail(String email){this.email=email;}
    	public void setLoginTime(String time){this.loginTime=time;}
    	public void setTutorialFinishTime(String time){this.tutorialFinishTime=time;}
    	public void setType(String type){this.type=type;}
    	public void setLoginTrial(int n){this.loginTrial=n;}
    	public void setTutorialFinished(boolean fin){this.tutorialFinished=fin;}
    	public void setAccountID(String id){this.accountID=id;}

    	public String getEmail(){return this.email;}
    	public String getLoginTime(){return this.loginTime;}
    	public String getTutorialFinishTime(){return this.tutorialFinishTime;}
    	public String getType(){return this.type;}
    	public Long getID(){return this.id;}
    	public int getLoginTrial(){return this.loginTrial;}
    	public boolean getTutorialFinished(){return this.tutorialFinished;}
    	public String getAccountID(){return this.accountID;}

    }
    
    
    
}