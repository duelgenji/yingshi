package com.yingshi.repository;

import com.wonders.xlab.framework.repository.MyRepository;
import com.yingshi.entity.UserBoat;

public interface UserBoatRepository extends MyRepository<UserBoat, Long> {

    UserBoat findByGuid(String guid);
}
