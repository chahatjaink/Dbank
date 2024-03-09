import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Time "mo:base/Time";

actor _DBank {
  stable var currentValue : Float = 0;
  stable var initalTime = Time.now();
  currentValue := 100;
  let id = 2;
  Debug.print(debug_show (id));

  public func topUp(amount : Float) {
    currentValue += amount;
    Debug.print(debug_show (currentValue));
  };

  public func withdraw(amount : Float) {
    let tempValue : Float = currentValue - amount;
    if (tempValue <= 0) {
      Debug.print("Insufficient funds");
      currentValue := 0;
      topUp(100);
      Debug.print(debug_show (currentValue));
      return;
    };
    currentValue -= amount;
    Debug.print(debug_show (currentValue));
  };

  public query func getCurrentValue() : async Float {
    currentValue;
  };

  public func compound() {
    let timeDiff = Time.now() - initalTime;
    let elapsedTime : Float = Float.fromInt(timeDiff / 1000000000);
    let interestRate : Float = 0.01;
    currentValue := currentValue * (1 + interestRate) ** elapsedTime;
    initalTime := Time.now();
  };

  // topUp();
};
