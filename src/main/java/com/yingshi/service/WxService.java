package com.yingshi.service;

import com.yingshi.entity.WxAccessToken;
import com.yingshi.entity.WxJsapiTicket;
import com.yingshi.repository.WxAccessTokenRepository;
import com.yingshi.repository.WxJsapiTicketRepository;
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

    public String getAccessToken(){

        String token;

        WxAccessToken wxAccessToken = wxAccessTokenRepository.findFirstByOrderByIdDesc();

        if(wxAccessToken == null || (wxAccessToken.getCreatedDate().getMillis() + wxAccessToken.getExpiresIn()*1000 < new Date().getTime())){
            Map<String, String> res = WxUtils.request(WxUtils.RequestType.GET,"token?grant_type=client_credential&appid="+WxUtils.WX_APP_ID+"&secret="+WxUtils.WX_APP_SECRET);
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
            Map<String, String> res = WxUtils.request(WxUtils.RequestType.GET,"ticket/getticket?access_token="+accessToken+"&type=jsapi");
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

}
