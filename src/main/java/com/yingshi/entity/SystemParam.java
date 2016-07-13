package com.yingshi.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 系统参数 比如：拯救人数 掀翻人数
 * Created by Knight on 2016/7/13 9:29.
 */
@Entity
@Table
public class SystemParam extends AbstractPersistable<Long> {

    private String name;

    private int value;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
