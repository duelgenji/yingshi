package com.yingshi.entity;

import com.wonders.xlab.framework.entity.AbstractBaseEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 微信 accessToken
 * Created by knight on 16/5/19.
 */
@Entity
@Table
public class WxAccessToken extends AbstractBaseEntity<Long> {

    private String accessToken;

    private double expiresIn;

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public double getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(double expiresIn) {
        this.expiresIn = expiresIn;
    }
}
