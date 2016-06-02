package com.yingshi.controller;

import com.yingshi.entity.UserBoat;
import com.yingshi.repository.UserBoatRepository;
import com.yingshi.service.WxService;
import com.yingshi.utils.UploadUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sun.misc.BASE64Decoder;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Created by knight on 16/5/19.
 */
@RestController
@RequestMapping("wx")
public class WxController {

    @Autowired
    WxService wxService;

    @Autowired
    UserBoatRepository userBoatRepository;

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


    @RequestMapping("generateBoat")
    public Map<String ,Object> generateBoat(@RequestParam String avatar1,
                                           @RequestParam String avatar2){
        Map<String, Object> res = new HashMap<>();

        UserBoat userBoat = new UserBoat();

        if (!avatar1.isEmpty() && !avatar2.isEmpty()) {
            BASE64Decoder decoder = new BASE64Decoder();
            try {
                byte[] buffer1 = decoder.decodeBuffer(avatar1);
                byte[] buffer2 = decoder.decodeBuffer(avatar2);
                String url1 = UploadUtils.uploadTo7niu("boat/",buffer1);
                String url2 = UploadUtils.uploadTo7niu("boat/",buffer2);

                userBoat.setTitle("");
                userBoat.setContent("");
                userBoat.setWxOpenId("test");
                userBoat.setRescueType((int)(Math.random()*4));
                userBoat.setGuid(UUID.randomUUID().toString());
                userBoat.setAvatar1(url1);
                userBoat.setAvatar2(url2);
                userBoatRepository.save(userBoat);

            } catch (IOException e) {
                res.put("success", 0);
                res.put("message", e.getMessage());
                return res;
            }
        }
        res.put("success", 1);
        res.put("boatId", userBoat.getGuid());
        return res;
    }


    @RequestMapping("retrieveBoat/{boatId}")
    public Map<String ,Object> retrieveBoat(@PathVariable String boatId){
        Map<String, Object> res = new HashMap<>();
        UserBoat userBoat = userBoatRepository.findByGuid(boatId);

        if(userBoat!=null){
            res.put("userBoat", userBoat);
        }

        res.put("success", 1);
        return res;
    }

}
