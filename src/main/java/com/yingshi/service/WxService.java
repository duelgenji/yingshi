package com.yingshi.service;

import com.yingshi.entity.WxAccessToken;
import com.yingshi.entity.WxJsapiTicket;
import com.yingshi.entity.WxUser;
import com.yingshi.repository.WxAccessTokenRepository;
import com.yingshi.repository.WxJsapiTicketRepository;
import com.yingshi.repository.WxUserRepository;
import com.yingshi.utils.WxUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;

/**
 * Created by knight on 16/5/18.
 */
@Service
public class WxService {

    @Autowired
    WxAccessTokenRepository wxAccessTokenRepository;

    @Autowired
    WxJsapiTicketRepository wxJsapiTicketRepository;

    @Autowired
    WxUserRepository wxUserRepository;

    public String getAccessToken(){

        String token;

        WxAccessToken wxAccessToken = wxAccessTokenRepository.findFirstByOrderByIdDesc();

        if(wxAccessToken == null || (wxAccessToken.getCreatedDate().getMillis() + wxAccessToken.getExpiresIn()*1000 < new Date().getTime())){
            Map<String, String> res = WxUtils.request(WxUtils.RequestType.GET,WxUtils.WX_URL+"token?grant_type=client_credential&appid="+WxUtils.WX_APP_ID+"&secret="+WxUtils.WX_APP_SECRET);
            token = res.get("access_token");

            wxAccessToken = new WxAccessToken();
            wxAccessToken.setAccessToken(token);
            wxAccessToken.setExpiresIn(Double.parseDouble(res.get("expires_in")));
            wxAccessTokenRepository.save(wxAccessToken);

        }else{
            token = wxAccessToken.getAccessToken();
        }
        return token;

    }


    public String getTicket(String accessToken){

        String token;

        WxJsapiTicket wxJsapiTicket = wxJsapiTicketRepository.findFirstByOrderByIdDesc();

        if(wxJsapiTicket == null || (wxJsapiTicket.getCreatedDate().getMillis() + wxJsapiTicket.getExpiresIn()*1000 < new Date().getTime())){
            Map<String, String> res = WxUtils.request(WxUtils.RequestType.GET,WxUtils.WX_URL+"ticket/getticket?access_token="+accessToken+"&type=jsapi");
            token = res.get("ticket");

            wxJsapiTicket = new WxJsapiTicket();
            wxJsapiTicket.setTicket(token);
            wxJsapiTicket.setExpiresIn(Double.parseDouble(res.get("expires_in")));
            wxJsapiTicketRepository.save(wxJsapiTicket);

        }else{
            token = wxJsapiTicket.getTicket();
        }
        return token;

    }

    public WxUser getSNSAccessToken(String code){
        String access_token,openid,refresh_token;

        Map<String, String> res = WxUtils.request(WxUtils.RequestType.GET,WxUtils.WX_SNS_URL+"oauth2/access_token?appid="+WxUtils.WX_APP_ID+"&secret="+WxUtils.WX_APP_SECRET+"&code="+code+"&grant_type=authorization_code");

        access_token = res.get("access_token");
        openid = res.get("openid");
        refresh_token = res.get("refresh_token");

        WxUser wxUser = wxUserRepository.findByOpenId(openid);

        if(wxUser==null){
            wxUser = new WxUser();
            wxUser.setOpenId(openid);
        }
        wxUser.setAccessToken(access_token);
        wxUser.setRefreshToken(refresh_token);
        wxUserRepository.save(wxUser);

        return wxUser;
    }

    public WxUser getUserInfo(WxUser wxUser){
        String nickname,province,city,country,headimgurl;
        int sex ;

        Map<String, String> res = WxUtils.request(WxUtils.RequestType.GET,WxUtils.WX_SNS_URL+"userinfo?access_token="+wxUser.getAccessToken()+"&openid="+wxUser.getOpenId()+"&lang=zh_CN ");

        sex = Integer.parseInt(res.get("sex"));
        nickname = res.get("nickname");
        province = res.get("province");
        city = res.get("city");
        country = res.get("country");
        headimgurl = res.get("headimgurl");


        wxUser.setNickname(nickname);
        wxUser.setSex(sex);
        wxUser.setHeadimgurl(headimgurl);
        wxUser.setProvince(province);
        wxUser.setCity(city);
        wxUser.setCountry(country);

        wxUserRepository.save(wxUser);

        return wxUser;
    }


}
