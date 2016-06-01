package com.yingshi.repository;

import com.yingshi.entity.WxAccessToken;
import com.wonders.xlab.framework.repository.MyRepository;

public interface WxAccessTokenRepository extends MyRepository<WxAccessToken, Long> {

    WxAccessToken findFirstByOrderByIdDesc();
}
