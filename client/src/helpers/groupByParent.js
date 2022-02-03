const groupByParent = (arr) => {
  const grouped = [];

  arr.forEach(el => {
    el.child = [];
    const isParent = !el.parent_preference_id;
    if (isParent) {
      grouped.push(el);
    } else {
      const parent = grouped.find(par => par.id === el.parent_preference_id);
      parent.child.push(el);
    }
  });

  return grouped;
}

export default groupByParent;
