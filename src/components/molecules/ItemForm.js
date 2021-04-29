import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Divider, TextInput } from "react-native-paper";

import styles from "../../styles/pantry.styles";
import {
  AMOUNT,
  PantryContext,
  getItemId,
} from "../../utils/pantry.utils";

import ItemFormAmtGroup from "./ItemFormAmtGroup";
import ItemFormBtnGroup from "./ItemFormBtnGroup";

const ItemForm = ({ closeModal }) => {
  const [pantryItems, setPantryItems] = useContext(PantryContext);
  const [itemName, setItemName] = useState("");
  const [itemAmt, setItemAmt] = useState(AMOUNT.NONE);

  const handleAddItem = () => {
    // setPantryItems(prev => ({
    //   ...prev,
    //   [getItemId(itemName)]: {
    //     label: itemName,
    //     amount: itemAmt
    //   }
    // }))
    setPantryItems(prev => ([
      ...prev,
      {
        id: getItemId(itemName),
        label: itemName,
        amount: itemAmt,
      },
    ]));
  };

  return (
    <View style={styles.itemFormContainer}>
      <TextInput
        style={styles.addItemFormInput}
        label="Name"
        value={itemName}
        mode="outlined"
        onChangeText={(text) => setItemName(text)}
      />
      <ItemFormAmtGroup
        amt={itemAmt}
        setAmt={setItemAmt}
      />
      <Divider style={styles.separator} />
      <ItemFormBtnGroup
        closeModal={closeModal}
        hasName={itemName === ""}
        addItem={handleAddItem}
      />
    </View>
  );
};

export default ItemForm;
