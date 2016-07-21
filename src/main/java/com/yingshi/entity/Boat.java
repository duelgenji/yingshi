package com.yingshi.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by knight on 16/6/3.
 */
@Entity
@Table
public class Boat extends AbstractPersistable<Long> {

    private int boatNo;

    private String boatTitle;

    private String result;

    /**
     * 红包金额
     */
    private double money;

    /**
     * 送的礼物 名称
     */
    private String present;

    /**
     * 自己看到的文字 送我XXXX
     */
    private String takeText;

    /**
     * 点击拯救时的类型 0木筏 1游艇 2巨轮 3航母
     */
    private int rescueType;


    public int getBoatNo() {
        return boatNo;
    }

    public void setBoatNo(int boatNo) {
        this.boatNo = boatNo;
    }

    public String getBoatTitle() {
        return boatTitle;
    }

    public void setBoatTitle(String boatTitle) {
        this.boatTitle = boatTitle;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public double getMoney() {
        return money;
    }

    public void setMoney(double money) {
        this.money = money;
    }

    public String getPresent() {
        return present;
    }

    public void setPresent(String present) {
        this.present = present;
    }

    public String getTakeText() {
        return takeText;
    }

    public void setTakeText(String takeText) {
        this.takeText = takeText;
    }

    public int getRescueType() {
        return rescueType;
    }

    public void setRescueType(int rescueType) {
        this.rescueType = rescueType;
    }
}
