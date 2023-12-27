import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import React from "react";
import { MultiSelect } from "react-multi-select-component";
import useAsync from "../../hooks/useAsync";
import CategoryServices from "../../services/CategoryServices";
import { notifySuccess } from "../lib/ToastifyMessage";

const CategoryTreeSelect = ({
  options,
  setOptions,
  selectedCategory,
  setSelectedCategory,
  setDefaultCategory,
}) => {
  const { data, loading } = useAsync(CategoryServices.getAllParentCategory);

  const STYLE = `
  .rc-tree-child-tree {
    display: block;
  }
  .node-motion {
    transition: all .3s;
    overflow-y: hidden;
  }
`;

  const motion = {
    motionName: "node-motion",
    motionAppear: false,
    onAppearStart: (node) => {
      return { height: 0 };
    },
    onAppearActive: (node) => ({ height: node.scrollHeight }),
    onLeaveStart: (node) => ({ height: node.offsetHeight }),
    onLeaveActive: () => ({ height: 0 }),
  };

  // render categories
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        title: category?.name,
        key: category._id,
        children:
          category?.children?.length > 0 &&
          renderCategories(category?.children),
      });
    }

    return myCategories;
  };

  // find object
  const findObject = (obj, target) => {
    return obj._id === target
      ? obj
      : obj?.children?.reduce(
          (acc, obj) => acc ?? findObject(obj, target),
          undefined
        );
  };

  // handle select category
  const handleSelect = (key) => {
    const obj = data?.data[0];
    const result = findObject(obj, key);

    if (result !== undefined) {
      const getCategory = selectedCategory.filter(
        (item) => item.value === result._id
      );

      if (getCategory?.length !== 0) {
        return notifySuccess("This category already selected!");
      }

      setSelectedCategory((pre) => [
        ...pre,
        {
          value: result?._id,
          label: result?.name,
        },
      ]);
      setOptions((pre) => [
        ...pre,
        {
          value: result?._id,
          label: result?.name,
        },
      ]);
      setDefaultCategory(() => [
        {
          value: result?._id,
          label: result?.name,
        },
      ]);
    }
  };

  return (
    <>
      <pre>
        {selectedCategory?.map((item, i, arr) =>
          arr.length - 1 !== i ? `${item.label}, ` : `${item.label}`
        )}
      </pre>
      <div className="mb-2">
        <MultiSelect
          labelledBy="Select"
          options={options}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>
      {!loading && data !== undefined && (
        <div className="draggable-demo capitalize">
          <style dangerouslySetInnerHTML={{ __html: STYLE }} />
          <Tree
            motion={motion}
            expandAction="click"
            animation="slide-up"
            treeData={renderCategories(data?.data)}
            onSelect={(v) => handleSelect(v[0])}
          />
        </div>
      )}
    </>
  );
};

export default CategoryTreeSelect;
