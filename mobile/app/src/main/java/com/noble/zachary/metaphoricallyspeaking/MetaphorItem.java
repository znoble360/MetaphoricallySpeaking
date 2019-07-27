package com.noble.zachary.metaphoricallyspeaking;

public class MetaphorItem
{
	private String mMetaphor;
	private String mDescription;

	// metaphorItem constructor
	public MetaphorItem(String metaphor, String description)
	{
		mMetaphor = metaphor;
		mDescription = description;
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

}
