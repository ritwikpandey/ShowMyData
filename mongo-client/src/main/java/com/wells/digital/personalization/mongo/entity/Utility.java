package com.wells.digital.personalization.mongo.entity;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Utility {

	public static String getFormattedDate() {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("ddMMyyyyHHmmssSSSS");
		String date = simpleDateFormat.format(new Date());
		return date;
	}
}
