package com.yingshi.entity;

import com.wonders.xlab.framework.entity.AbstractBaseEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by knight on 16/6/6.
 */
@Entity
@Table
public class WxUser extends AbstractBaseEntity<Long> {

    //当前公众号 用户的唯一标识
    private String openId;

    //网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
    private String accessToken;

    //由于access_token拥有较短的有效期，当access_token超时后，可以使用refresh_token进行刷新，
    // refresh_token有效期为30天，当refresh_token失效之后，需要用户重新授权。(此项目不用,仅保存)
    private String refreshToken;

    private String nickname;

    private String headimgurl;

    //用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
    private int sex;

    private String province;

    private String city;

    private String country;

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getHeadimgurl() {
        return headimgurl;
    }

    public void setHeadimgurl(String headimgurl) {
        this.headimgurl = headimgurl;
    }

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
