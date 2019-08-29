package com.croisssancehub.portal.web;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * ErrorControllerViewer
*/
@Controller
public class ErrorControllerViewer implements ErrorController{

    @RequestMapping(value="/error")
    public String errorviewpage(HttpServletRequest request,ModelMap model,HttpSession session){
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
     
    if (status != null) {
        Integer statusCode = Integer.valueOf(status.toString());
     
        if(statusCode == HttpStatus.NOT_FOUND.value()) {
            return "pages/errors/error-404";
        }
        else if(statusCode == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
            model.put("message",session.getAttribute("bugs"));
            return "pages/errors/error-500";
        }
    }
        return "pages/errors/error-403";
    }

    @Override
    public String getErrorPath() {
        return null;
    }
}
 