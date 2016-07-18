package com.yingshi.repository;

import com.wonders.xlab.framework.repository.MyRepository;
import com.yingshi.entity.UserBoatInteraction;

import java.util.List;

/**
 *
 * Created by duelgenji on 16/7/18.
 */
public interface UserBoatInteractionRepository extends MyRepository<UserBoatInteraction, Long> {

    UserBoatInteraction findByGuidAndOpenId(String boatId, String openId);

    int countByGuidAndType(String boatId, int type);

    List<UserBoatInteraction> findByGuidAndType(String boatId, int type);
}
