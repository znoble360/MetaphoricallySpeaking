package com.noble.zachary.metaphoricallyspeaking;

public class MetaphorItem
{
	private String mMetaphor;
	private String mDescription;

	public MetaphorItem(String metaphor, String description)
	{
		mMetaphor = metaphor;
		mDescription = description;
	}

	public String getMetaphor()
	{
		return mMetaphor;
	}

	public String getDescription()
	{
		return mDescription;
	}

}
