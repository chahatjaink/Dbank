import Debug "mo:base/Debug";
import Nat "mo:base/Nat";

actor DBank {
  var currentValue = 0;
  currentValue := 100;
  let id = 2;
  Debug.print(debug_show (id));

  public func topUp(amount : Nat) {
    currentValue += amount;
    Debug.print(debug_show (currentValue));
  };

  public func withdraw(amount : Nat) {
    Debug.print(debug_show (currentValue));
    if (currentValue <= 0) {
      Debug.print("Insufficient funds");
      topUp(100);
      Debug.print(debug_show (currentValue));
      return;
    };
    currentValue -= amount;
  };
  // topUp();
};
