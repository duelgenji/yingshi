package com.yingshi.entity;

import com.wonders.xlab.framework.entity.AbstractBaseEntity;

import javax.persistence.*;

/**
 * Created by knight on 16/5/30.
 */
@Entity
@Table
public class UserBoat extends AbstractBaseEntity<Long> {

    /**
     * 创建者 微信openid
     */
    private String openId;

    /**
     * 创建者 微信头像
     */
    private String headimgurl;

    /**
     * 创建者 微信昵称
     */
    private String nickname;

    /**
     * 用于网页传参 标示UserBoat唯一性
     */
    private String guid;

    private String avatar1;

    private String avatar2;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn
    private Boat boat;

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public String getHeadimgurl() {
        return headimgurl;
    }

    public void setHeadimgurl(String headimgurl) {
        this.headimgurl = headimgurl;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    public String getAvatar1() {
        return avatar1;
    }

    public void setAvatar1(String avatar1) {
        this.avatar1 = avatar1;
    }

    public String getAvatar2() {
        return avatar2;
    }

    public void setAvatar2(String avatar2) {
        this.avatar2 = avatar2;
    }

    public Boat getBoat() {
        return boat;
    }

    public void setBoat(Boat boat) {
        this.boat = boat;
    }
}
