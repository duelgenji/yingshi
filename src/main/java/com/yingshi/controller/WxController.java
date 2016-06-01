package com.yingshi.controller;

import com.yingshi.service.WxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by knight on 16/5/19.
 */
@RestController
@RequestMapping("wx")
public class WxController {

    @Autowired
    WxService wxService;

    @Transactional
    @RequestMapping("getAccessToken")
    public Map<String ,Object> getAccessToken(){
        Map<String, Object> res = new HashMap<>();

        res.put("success", 1);
        res.put("token", wxService.getAccessToken());
        return res;
    }

    @Transactional
    @RequestMapping("getTicket")
    public Map<String ,Object> getTicket(){
        Map<String, Object> res = new HashMap<>();

        res.put("success", 1);
        res.put("token", wxService.getTicket(wxService.getAccessToken()));
        return res;
    }

}
