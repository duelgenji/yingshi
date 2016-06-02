package com.yingshi.entity;

import com.wonders.xlab.framework.entity.AbstractBaseEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by knight on 16/5/30.
 */
@Entity
@Table
public class UserBoat extends AbstractBaseEntity<Long> {

    private String wxOpenId;

    private String guid;

    private String avatar1;

    private String avatar2;

    /**
     * 输入标题
     */
    private String title;

    /**
     * 随机文案
     */
    private String content;

    /**
     * 点击拯救时的类型 0木筏 1游艇 2巨轮 3航母
     */
    private int rescueType;

    public String getWxOpenId() {
        return wxOpenId;
    }

    public void setWxOpenId(String wxOpenId) {
        this.wxOpenId = wxOpenId;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getRescueType() {
        return rescueType;
    }

    public void setRescueType(int rescueType) {
        this.rescueType = rescueType;
    }
}
