package com.yingshi.controller;

import com.yingshi.entity.*;
import com.yingshi.repository.*;
import com.yingshi.service.WxService;
import com.yingshi.utils.UploadUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import sun.misc.BASE64Decoder;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
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
    WxUserRepository wxUserRepository;

    @Autowired
    UserBoatRepository userBoatRepository;

    @Autowired
    UserBoatInteractionRepository userBoatInteractionRepository;

    @Autowired
    BoatRepository boatRepository;

    @Autowired
    SystemParamRepository systemParamRepository;

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
                                            @RequestParam String avatar2,
                                            @RequestParam String openId){
        Map<String, Object> res = new HashMap<>();

        UserBoat userBoat = new UserBoat();

        if (!avatar1.isEmpty() && !avatar2.isEmpty()) {
            BASE64Decoder decoder = new BASE64Decoder();
            try {
                byte[] buffer1 = decoder.decodeBuffer(avatar1);
                byte[] buffer2 = decoder.decodeBuffer(avatar2);
                String url1 = UploadUtils.uploadTo7niu("boat/",buffer1);
                String url2 = UploadUtils.uploadTo7niu("boat/",buffer2);


                userBoat.setOpenId(openId);

                Boat boat = boatRepository.findByBoatNo((int)(Math.random()*(boatRepository.count())+1));

                userBoat.setBoat(boat);
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
        res.put("boat", userBoat.getGuid());
        return res;
    }


    /**
     * 获取用户小船信息
     */
    @RequestMapping("retrieveBoat/{boatId}")
    public Map<String ,Object> retrieveBoat(@PathVariable String boatId){
        Map<String, Object> res = new HashMap<>();
        UserBoat userBoat = userBoatRepository.findByGuid(boatId);

        if(userBoat==null){
            res.put("success", 0);
            res.put("message", "boat null");
            return res;
        }

        res.put("rescue_number", userBoatInteractionRepository.countByGuidAndType(boatId,0));
        res.put("refuse_number", userBoatInteractionRepository.countByGuidAndType(boatId,1));




        res.put("userBoat", userBoat);
        res.put("success", 1);
        return res;
    }

    /**
     * 获取参数 全局拯救人数 掀翻人数
     */
    @RequestMapping(value = "systemParam",method = RequestMethod.GET)
    public Map<String ,Object> systemParam(){
        Map<String, Object> res = new HashMap<>();
        List<SystemParam> systemParamList = systemParamRepository.findAll();

        for(SystemParam sp:systemParamList){
            res.put(sp.getName(), sp.getValue());
        }
        res.put("success", 1);
        return res;
    }

    /**
     * 更新参数 全局拯救人数 掀翻人数
     */
    @RequestMapping(value = "updateSystemParam/{name}",method = RequestMethod.GET)
    public Map<String ,Object> updateSystemParam(@PathVariable String name){
        Map<String, Object> res = new HashMap<>();
        SystemParam systemParam = systemParamRepository.findByName(name);

        if(systemParam!=null){
            systemParam.setValue(systemParam.getValue()+1);
            systemParamRepository.save(systemParam);
        }
        res.put("success", 1);
        return res;
    }


    /**
     * 小船互动
     */
    @RequestMapping("boatInteraction")
    public Map<String ,Object> boatInteraction(@RequestParam String boatId,
                                            @RequestParam String openId,
                                            @RequestParam int type){
        Map<String, Object> res = new HashMap<>();
        UserBoat userBoat = userBoatRepository.findByGuid(boatId);

        if(userBoat==null){
            res.put("success", 0);
            res.put("message", "boat null");
            return res;
        }

        WxUser wxUser = wxUserRepository.findByOpenId(openId);

        if(wxUser==null){
            res.put("success", 0);
            res.put("message", "user null");
            return res;
        }

        UserBoatInteraction ubi = userBoatInteractionRepository.findByGuidAndOpenId(boatId,openId);

        if(ubi==null){
            ubi = new UserBoatInteraction();
            ubi.setGuid(boatId);
            ubi.setOpenId(openId);
            ubi.setHeadimgurl(wxUser.getHeadimgurl());
            ubi.setNickname(wxUser.getNickname());
            ubi.setType(type);
        }

        userBoatInteractionRepository.save(ubi);

        res.put("success", 1);
        return res;
    }


    /**
     * 导入boat
     */
    @RequestMapping("importBoat")
    public Map<String ,Object> importBoat(@RequestParam int boatNo,
                                          @RequestParam int rescueType,
                                          @RequestParam String boatTitle,
                                          @RequestParam String result,
                                          @RequestParam double money,
                                          @RequestParam String present,
                                          @RequestParam String sendText,
                                          @RequestParam String takeText,
                                          @RequestParam String imgUrl){
        Map<String, Object> res = new HashMap<>();

        Boat boat = boatRepository.findByBoatNo(boatNo);

        if(boat==null){
            boat = new Boat();
            boat.setRescueType(rescueType);
            boat.setBoatNo(boatNo);
            boat.setBoatTitle(boatTitle);
            boat.setResult(result);
            boat.setMoney(money);
            boat.setPresent(present);
            boat.setSendText(sendText);
            boat.setTakeText(takeText);
            boat.setImgUrl(imgUrl);

            boatRepository.save(boat);

        }

        res.put("success", 1);
        return res;
    }


    /**
     * wx 网页授权 重定向
     */
    @Transactional
    @RequestMapping("wxRedirect")
    public Map<String ,Object>  wxRedirect(
            @RequestParam String code,
            @RequestParam(required = false) String boat,
            HttpServletResponse response){

        WxUser wxUser = wxService.getUserInfo(wxService.getSNSAccessToken(code));
        //        response.sendRedirect("http://www.zhixin.me/boat_upload.html?openId="+wxUser.getOpenId());

        String redirect_url = "http://www.zhixin.me/ysweb/boat_example.html?openId="+wxUser.getOpenId();

        if(boat!=null && !boat.equals("")){
            redirect_url = "http://www.zhixin.me/ysweb/boat_show.html?openId="+wxUser.getOpenId()+"&boat="+boat;
        }

        Map<String, Object> res = new HashMap<>();
        res.put("success", 1);
        res.put("redirect_url", redirect_url);
        return res;

    }

}
