package com.yingshi.entity;

import com.wonders.xlab.framework.entity.AbstractBaseEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 微信 JsapiTicket
 * Created by knight on 16/5/19.
 */
@Entity
@Table
public class WxJsapiTicket extends AbstractBaseEntity<Long> {

    private String ticket;

    private double expiresIn;

    public String getTicket() {
        return ticket;
    }

    public void setTicket(String ticket) {
        this.ticket = ticket;
    }

    public double getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(double expiresIn) {
        this.expiresIn = expiresIn;
    }
}
