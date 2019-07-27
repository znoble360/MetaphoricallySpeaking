package com.noble.zachary.metaphoricallyspeaking;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class MetaphorAdapter extends RecyclerView.Adapter<MetaphorAdapter.MetaphorViewHolder>
{
	private ArrayList<MetaphorItem> mMetaphorList;

	public static class MetaphorViewHolder extends RecyclerView.ViewHolder
	{
		public TextView mMetaphorTextView;
		public TextView mDescriptionTextView;

		public MetaphorViewHolder(View itemView)
		{
			super(itemView);
			mMetaphorTextView = itemView.findViewById(R.id.metaphor);
			mDescriptionTextView = itemView.findViewById(R.id.description);
		}
	}

	public MetaphorAdapter(ArrayList<MetaphorItem> MetaphorList)
	{
		mMetaphorList = MetaphorList;
	}

	@Override
	public MetaphorViewHolder onCreateViewHolder(ViewGroup parent, int viewType)
	{
		View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.metaphor_item, parent, false);
		MetaphorViewHolder mvh = new MetaphorViewHolder(v);
		return mvh;
	}

	@Override
	public void onBindViewHolder(MetaphorViewHolder holder, int position)
	{
		MetaphorItem currentItem = mMetaphorList.get(position);

		holder.mMetaphorTextView.setText(currentItem.getMetaphor());
		holder.mDescriptionTextView.setText(currentItem.getDescription());
	}

	@Override
	public int getItemCount()
	{
		return mMetaphorList.size();
	}
}
