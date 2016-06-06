package com.yingshi.repository;

import com.wonders.xlab.framework.repository.MyRepository;
import com.yingshi.entity.WxUser;

public interface WxUserRepository extends MyRepository<WxUser, Long> {

    WxUser findByOpenId(String openId);

}
