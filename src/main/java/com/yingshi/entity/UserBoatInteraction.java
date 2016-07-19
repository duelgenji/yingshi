package com.yingshi.entity;

import com.wonders.xlab.framework.entity.AbstractBaseEntity;

import javax.persistence.Entity;

/**
 * Created by knight on 16/6/3.
 */
@Entity
public class UserBoatInteraction extends AbstractBaseEntity<Long> {

    /**
     * 用于网页传参 标示UserBoat唯一性
     */
    private String guid;

    /**
     * 交互者 openId
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
     * 交互类型 0拯救 1掀翻
     */
    private int type;

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

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

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}
