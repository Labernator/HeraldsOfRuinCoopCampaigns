import React from "react";

export const QuickReferenceSheet = () =>
    <div id="quick-reference-container" className="quick-reference-container">
        <div className="quick-ref-title">NIGHT MARKETS</div>
        <div className="quick-ref-section-container" style={{ border: "2px solid" }}>
            <div className="quick-ref-table-container">
                <table>
                    <caption>Night Markets Spawn Table</caption>
                    <thead>
                        <tr>
                            <th>Dice roll</th>
                            <th>Enemies Spawned</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2</td>
                            <td>A unit of 3 Fra’al Invaders</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>A unit of 3 Freebootaz</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>A single Viskeon ‘Tourist’</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>A unit of 5 Hrud Wardens</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>A unit of 2 Rak’Gol Marauders</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>A unit of 4 Renegade Space Marines</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>A unit of 3 Loxatl Mercenaries</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>A single Strygan War Form</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>A single Shen Exile</td>
                        </tr>
                        <tr>
                            <td>11</td>
                            <td>A unit of 3 Pariahs</td>
                        </tr>
                        <tr>
                            <td>12</td>
                            <td>Roll again twice on this table</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{ gridColumn: 2 }}>
                <div className="quick-ref-subheader">Night Markets Special Rules</div>
                <div className="quick-ref-text" style={{ fontWeight: "bold", paddingBottom: 0 }}>A Galaxy’s Worth of Hot Death:</div>
                <div className="quick-ref-text">At the beginning of the Movement phase, any model in cover may attempt to scavenge a new weapon. Roll a d6 for each model attempting to do so. On a 1 or 2, the model suffers a mortal wound. On any other result, the model may replace any non-grenade weapon it is carrying with another weapon that it could have been upgraded with, ignoring restrictions on minimum units or maximum weapons. This lasts for the duration of the mission.</div>
                <div className="quick-ref-text" style={{ fontWeight: "bold", paddingBottom: 0, paddingTop: 0 }}>Market Mayhem:</div>
                <div className="quick-ref-text" style={{ paddingBottom: 0, paddingTop: 0 }}>Some units just don’t have a lot of weapons they can upgrade, and weapons are not the only available merchandise in the Night Markets. On a successful swap roll, instead of swapping a weapon, a warrior may be given one of the following: </div>
                <div>
                    <ul>
                        <li><div className="quick-ref-ul">Combat Drugs:</div> <div style={{ float: "left" }}>+2 Attacks</div></li>
                        <li><div className="quick-ref-ul">Ballistic Wraithcloak:</div> <div style={{ float: "left" }}>+1 AS (max 2+) and 5+ invulnerable save</div></li>
                        <li><div className="quick-ref-ul">Monofilament Reliquaries:</div> <div style={{ float: "left" }}>+1 AP for melee attacks</div></li>
                        <li><div className="quick-ref-ul">Plentiful Ammo:</div> <div style={{ float: "left" }}>+1 AP for ranged attacks</div></li>
                        <li><div className="quick-ref-ul">Stim Pack:</div> <div style={{ float: "left" }}>+2 Toughness</div></li>
                        <li><div className="quick-ref-ul">Longtoof’s Go-Juice:</div> <div style={{ float: "left" }}>+2 Movement and +2 to Advance moves</div></li>
                    </ul>
                </div>
                <div className="quick-ref-text" style={{ paddingBottom: 0, paddingTop: 0 }}>A model can only have one of these upgrades at a time. A model can swap weapons OR have one of the above upgrades, but not both.</div>
            </div>
        </div>
        <div className="quick-ref-title">THE ENEMY TURN PHASES</div>
        <div className="quick-ref-section-container quick-ref-section-spawning">
            <div className="quick-ref-header">Spawning Phase</div>
            <div className="quick-ref-span-text">
                <div className="quick-ref-text">At the beginning of the enemy turn, each player consults the chart above and rolls a number of times equal to the difficulty of the mission on that chart. For each spawn, roll a d6 and place your spawn in the corresponding spawn zone.</div>
            </div>
        </div>
        <div className="quick-ref-section-container quick-ref-section-movement">
            <div className="quick-ref-header"> Movement Phase</div>
            <div className="quick-ref-span-text quick-ref-info-text">UNITS THAT DID NOT SPAWN THIS TURN ARE MOVED FIRST.</div>
            <div className="quick-ref-parallel quick-ref-shooting">
                <div className="quick-ref-subheader">Shooting Units</div>
                <div className="quick-ref-text">Units with the Shooting keyword will move as far as possible toward the nearest undefended objective (include the Exit zone, if present). If they reach that objective, they will only move to get line of sight on a player controlled model, but will never move further than 3” from that objective. If there are no objectives or all objectives are player controlled, they will move toward the nearest player-controlled model, stopping when they are all in range with their weapons. They will not jump through windows but they will move over obstacles smaller than 1”.</div>
            </div>
            <div className="quick-ref-parallel quick-ref-assault">
                <div className="quick-ref-subheader">Assault Units</div>
                <div className="quick-ref-text">Units with the Assault keyword will move toward the nearest player-controlled model by the shortest possible route. They will not jump through windows, but they will run over obstacles lower than 1”.</div>
            </div>
        </div>
        <div className="quick-ref-section-container quick-ref-section-shooting">
            <div className="quick-ref-header">Shooting Phase</div>
            <div className="quick-ref-parallel quick-ref-shooting">
                <div className="quick-ref-subheader">Shooting Units</div>
                <div className="quick-ref-text">Units with the Shooting keyword will shoot the nearest player-controlled model first, allocating hits to as many different models as possible.</div>
            </div>
            <div className="quick-ref-parallel quick-ref-assault">
                <div className="quick-ref-subheader">Assault Units</div>
                <div className="quick-ref-text">Units with the Assault keyword will shoot the nearest player-controlled model.</div>
            </div>
        </div>
        <div className="quick-ref-section-container quick-ref-section-charge">
            <div className="quick-ref-header">Charge Phase</div>
            <div className="quick-ref-parallel quick-ref-shooting">
                <div className="quick-ref-subheader">Shooting Units</div>
                <div className="quick-ref-text">Units with the shooting keyword will never themselves assault but will fight normally if they are assaulted.</div>
            </div>
            <div className="quick-ref-parallel quick-ref-assault">
                <div className="quick-ref-subheader">Assault Units</div>
                <div className="quick-ref-text">At the start of the Charge phase, roll 2d6 for the entire table. This is the maximum distance that all opposition models may charge this turn. Starting with the opposition unit closest to a player-controlled model, move the unit so it gets as many models as possible into base contact and then resolve overwatch. Repeat that for all enemy units that are in range to charge.</div>
            </div>
        </div>

        {/* <div>
            <table>
                <thead>
                    <tr>
                        <th>Dice roll</th>
                        <th>Enemies Spawned</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Lucky you. No spawns for this die</td>
                    </tr>
                    <tr>
                        <td>2-3</td>
                        <td>One unit of five Wyches.*</td>
                    </tr>
                    <tr>
                        <td>4-5</td>
                        <td>One unit of five Kabalite Warriors*</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Roll on the Perils of Ashathdrukhiina Table</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Dice roll</th>
                        <th>Enemies Spawned</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>A single Dracon</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>One unit of 3 Incubi*</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>A single Talos Pain Engine</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>One unit of 3 Grotesques</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>One unit of 3 Reavers</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Roll twice on this table. If the result is a double, spawn Lytherak**</td>
                    </tr>
                </tbody>
            </table>
        </div> */}
    </div >;
