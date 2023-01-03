export enum CropPositionEnum {
  top = 'top',
  right_top = 'right top',
  right = 'right',
  right_bottom = 'right bottom',
  bottom = 'bottom',
  left_bottom = 'left bottom',
  left = 'left',
  left_top = 'left top',
  north = 'north',
  northeast = 'northeast',
  east = 'east',
  southeast = 'southeast',
  south = 'south',
  southwest = 'southwest',
  west = 'west',
  northwest = 'northwest',
  center = 'center',
  centre = 'centre',
  entropy = 'entropy',
  attention = 'attention'
}

export type Meta = {
  author: string
  pack: string
  cropPosition?: CropPositionEnum
  keepScale?: boolean
  removebg?: boolean
}
