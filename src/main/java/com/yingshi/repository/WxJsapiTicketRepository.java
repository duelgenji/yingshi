package com.yingshi.repository;

import com.wonders.xlab.framework.repository.MyRepository;
import com.yingshi.entity.WxJsapiTicket;

public interface WxJsapiTicketRepository extends MyRepository<WxJsapiTicket, Long> {

    WxJsapiTicket findFirstByOrderByIdDesc();
}
