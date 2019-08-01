package com.noble.zachary.metaphoricallyspeaking;

public class MetaphorItem
{
	private String mMetaphor;
	private String mDescription;
	private String mDate;
	private String mLikes;

	// metaphorItem constructor
	public MetaphorItem(String metaphor, String description, String date, int likes)
	{
		mMetaphor = metaphor;
		mDescription = description;
		mDate = "Posted on: " + date;
		mLikes = "Score: " + Integer.toString(likes);
	}

	// returns the metaphor from this metaphorItem
	public String getMetaphor()
	{
		return mMetaphor;
	}

	// returns the description from this metaphorItem
	public String getDescription()
	{
		return mDescription;
	}

	// returns the date from this metaphorItem
	public String getDate()
	{
		return mDate;
	}

	// returns the likes from this metaphorItem
	public String getLikes()
	{
		return mLikes;
	}

}
