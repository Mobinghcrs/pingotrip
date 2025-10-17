
import React from 'react';

interface FilterGroup {
  title: string;
  items: { label: string; value: string }[];
  type: 'checkbox' | 'radio';
}

interface FilterSidebarProps {
  title: string;
  filterGroups: FilterGroup[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ title, filterGroups }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 h-fit sticky top-24">
            <h3 className="text-lg font-bold mb-4">{title}</h3>
            {filterGroups.map((group, index) => (
                <div key={index} className="border-t py-4">
                    <h4 className="font-semibold mb-2">{group.title}</h4>
                    {group.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center mb-2">
                            <input type={group.type} id={`${group.title}-${item.value}`} name={group.title} value={item.value} className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500" />
                            <label htmlFor={`${group.title}-${item.value}`} className="ms-2 text-sm font-medium text-gray-700">{item.label}</label>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default FilterSidebar;
